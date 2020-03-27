import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Theme } from '../../board/model/theme.model';
import { AdminViewService } from '../admin-view.service';
import { UserService } from '../../user/login/user.service';

@Component({
  selector: 'mle-theme-form',
  templateUrl: './theme-form.component.html',
  styleUrls: ['./theme-form.component.scss']
})
export class ThemeFormComponent implements OnInit {

  @Input()
  theme: Theme;

  constructor(private http: HttpClient,
              private adminViewService: AdminViewService,
              private userService: UserService) { }

  ngOnInit(): void {
  }

  startWriteBoard(themeId: number) {
    this.adminViewService.startWriteBoardTheme({
      user: this.getAdminAuth(),
      themeId: themeId
    }).subscribe( () => {
    })
  }

  selectThemeForRetro(themeId: number) {
    this.adminViewService.selectRetroTheme({
      user: this.getAdminAuth(),
      themeId: themeId
    }).subscribe( () => {
    })
  }

  private getAdminAuth() {
    const {userName, password} = this.userService.getUser();
    return {userName, password};
  }
}
