import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin/admin.service';
import { Board, Theme } from '../../service/theme/theme.model';
import { UserService } from '../../service/user/user.service';

@Component({
  selector: 'mle-view-admin',
  templateUrl: './view-admin.component.html',
  styleUrls: ['./view-admin.component.scss']
})
export class ViewAdminComponent implements OnInit {
  themes: Theme[] = [];

  constructor(private adminService: AdminService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.getThemes();
  }

  private getAdminAuth() {
     const {userName, password} = this.userService.getUser();
    return {userName, password};
  }

  getThemes() {
    this.adminService.getThemes().subscribe(themes => {
      this.themes = themes;
    })
  }

  reset() {
    this.adminService.reset(this.getAdminAuth()).subscribe(() => {})
  }

  addTheme() {
    this.themes.push(new Theme());
  }
}
