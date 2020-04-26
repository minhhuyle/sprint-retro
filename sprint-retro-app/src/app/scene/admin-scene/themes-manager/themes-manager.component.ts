import { Component, Input, OnInit } from '@angular/core';
import { Theme } from '../../../service/theme/theme.model';
import { AdminService } from '../../../service/admin/admin.service';

@Component({
  selector: 'mle-themes-manager',
  templateUrl: './themes-manager.component.html',
  styleUrls: ['./themes-manager.component.scss']
})
export class ThemesManagerComponent implements OnInit {

  themes: Theme[];

  selectedTheme: Theme;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getThemes();
  }

  getThemes() {
    this.adminService.getThemes().subscribe(themes => {
      this.themes = themes;
    })
  }

  editTheme(themeToEdit: Theme) {
    this.selectedTheme = themeToEdit;
  }

  addTheme() {
    this.themes.push(new Theme());
  }
}
