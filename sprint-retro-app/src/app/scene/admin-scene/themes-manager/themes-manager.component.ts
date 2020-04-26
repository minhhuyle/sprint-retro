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
    this.loadThemes();
  }

  loadThemes() {
    this.adminService.getThemes().subscribe(themes => {
      this.themes = themes;
      if(!this.selectedTheme) {
        this.selectedTheme = this.themes.find(val => val.selectedTheme);
      } else if(this.selectedTheme?.id) {
        this.selectedTheme = this.themes.find(val => val.id === this.selectedTheme.id);
      }
    })
  }

  editTheme(themeToEdit: Theme) {
    this.selectedTheme = themeToEdit;
  }

  addTheme() {
    this.themes.push(new Theme());
  }
}
