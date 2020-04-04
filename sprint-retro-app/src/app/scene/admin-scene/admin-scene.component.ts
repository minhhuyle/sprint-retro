import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin/admin.service';
import { Board, Theme } from '../../service/theme/theme.model';
import { UserService } from '../../service/user/user.service';

@Component({
  selector: 'mle-admin-scene',
  templateUrl: './admin-scene.component.html',
  styleUrls: ['./admin-scene.component.scss']
})
export class AdminSceneComponent implements OnInit {
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
