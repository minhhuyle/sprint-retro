import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Board } from '../../admin-view/model/board.model';
import { AdminViewService } from '../../admin-view/admin-view.service';
import { UserService } from './user.service';
import { BrowserStorageService } from '../../storage/browser-storage.service';

@Component({
  selector: 'mle-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logInForm: FormGroup;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private browserStorageService: BrowserStorageService) {
    this.logInForm =  this.formBuilder.group({
      "userName": ['', Validators.required],
      "password": ['', Validators.required]
    });
  }

  ngOnInit() {
    const user = this.browserStorageService.getUser();
    if(user) {
      this.logInForm.patchValue({
        userName: user.userName,
        password: user.password
      });
      this.logIn();
    }
  }

  private getUserForm() {
    const {userName, password } = this.logInForm.value;
    return {userName, password};
  }

  logIn() {
    this.userService.logIn(this.getUserForm()).subscribe(res => {
      this.userService.setUser(res);
      this.router.navigateByUrl('/view');
    });
  }

  signUp() {
    this.userService.signUp(this.getUserForm()).subscribe(res => {
      this.userService.setUser(res);
      this.router.navigateByUrl('/view');
    });
  }
}
