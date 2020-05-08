import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../service/admin/admin.service';
import { User } from '../../../service/user/user.model';
import { UsersManagerMode } from './users-manager.model';
import { ToastService } from '../../../service/toast/toast.service';

@Component({
  selector: 'mle-users-manager',
  templateUrl: './users-manager.component.html',
  styleUrls: ['./users-manager.component.scss']
})
export class UsersManagerComponent implements OnInit {
  users: User[] = [];
  selectedUser : User;
  userForm: FormGroup;
  // todo enum
  roles: string[];

  private mode: UsersManagerMode;

  constructor(private adminService: AdminService,
              private formBuilder: FormBuilder,
              private toastService: ToastService
  ) {
    this.userForm =  this.formBuilder.group({
      "userName": ['', Validators.required],
      "password": ['', Validators.required],
      "role": ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.adminService.getUsers().subscribe(result => this.users = result);
    this.adminService.getRoles().subscribe(roles => this.roles = roles);
  }

  addUser() {
    this.selectedUser = new User();
    this.mode = UsersManagerMode.CreateUser;
    this.resetUserForm();
  }

  private resetCompleteState() {
    this.selectedUser = null;
    this.mode = null;
    this.resetUserForm();
  }

  private resetUserForm() {
    this.userForm.patchValue({
      userName: '',
      password: '',
      role: '',
    });
  }

  selectUserToEdit(user: User) {
    /*this.selectedUser = user;
    this.mode = UsersManagerMode.EditUser;
    this.userForm.patchValue({
      userName: this.selectedUser.userName,
    });*/
  }

  isSelected(user: User): string{
    return this.selectedUser === user ? 'active' : '';
  }

  isEditUserMode(): boolean {
    return this.mode === UsersManagerMode.EditUser;
  }

  saveUserForm() {
    switch (this.mode) {
      case UsersManagerMode.CreateUser:
        this.adminService.createUser(this.getUserForm()).subscribe(
          userCreated => {
            this.users.push(userCreated);
            this.toastService.successTitle(`You have successfully created User:${userCreated.userName} !`);
            this.resetCompleteState();
          }, () => {
            this.toastService.errorTitle(`Cannot creat User:${this.userForm.get('userName').value} !`);
          });
        break;
      case UsersManagerMode.EditUser: break;
    }
  }

  private getUserForm(): User {
    const {userName, password, role } = this.userForm.value;
    return {userName, password, role};
  }
}
