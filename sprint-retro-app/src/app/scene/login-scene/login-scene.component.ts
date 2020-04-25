import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user/user.service';
import { BrowserStorageService } from '../../service/storage/browser-storage.service';

@Component({
  selector: 'mle-login-scene',
  templateUrl: './login-scene.component.html',
  styleUrls: ['./login-scene.component.scss']
})
export class LoginSceneComponent implements OnInit {
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
      if(user.isLogged) {
        this.logIn();
      }
    }
  }

  private getUserForm() {
    const {userName, password } = this.logInForm.value;
    return {userName, password};
  }

  logIn() {
    this.userService.logIn(this.getUserForm()).subscribe(res => {
      const headerAuthorization: string[] = res.headers.get('Authorization').split(' ');
      if(headerAuthorization?.length === 2) {
        this.userService.setToken(headerAuthorization[1]);
      }
      this.userService.loadUserInfo(this.getUserForm()).subscribe(res => {
        this.userService.setLoggedUser(res);
        this.router.navigateByUrl('/view');
      });
    });
  }

  signUp() {
    this.userService.signUp(this.getUserForm()).subscribe(() => {
      this.logIn();
    });
  }
}
