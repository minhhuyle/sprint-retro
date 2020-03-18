import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Board } from '../../admin-view/model/board.model';
import { AdminViewService } from '../../admin-view/admin-view.service';
import { UserService } from './user.service';

@Component({
  selector: 'mle-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logInForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService) {
    this.logInForm =  this.formBuilder.group({
      "userName": ['', Validators.required],
      "password": ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  logIn() {
    this.userService.logIn(this.logInForm.value).subscribe(res => {
      this.userService.setUser(res);
      this.router.navigateByUrl('/view');
    });
  }

  signUp() {
    this.userService.signUp(this.logInForm.value).subscribe(res => {
      this.userService.setUser(res);
      this.router.navigateByUrl('/view');
    });
  }
}
