import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../../../../service/admin/admin.service';
import { Theme } from '../../../../service/theme/theme.model';

@Component({
  selector: 'mle-theme-form',
  templateUrl: './theme-form.component.html',
  styleUrls: ['./theme-form.component.scss']
})
export class ThemeFormComponent implements OnInit {
  @Input()
  theme: Theme;

  @Output()
  selectThemePostCall: EventEmitter<void> = new EventEmitter();

  constructor(private http: HttpClient,
              private adminViewService: AdminService) { }

  ngOnInit(): void {
  }

  saveTheme() {
    this.adminViewService.saveTheme(this.theme).subscribe((theme) => {
      this.theme = {...theme};
    });
  }

  startWriteBoard(themeId: number) {
    this.adminViewService.startWriteBoardTheme(themeId).subscribe( () => {})
  }

  selectThemeForRetro(themeId: number) {
    this.adminViewService.selectThemeForRetro(themeId).subscribe(() => {
      this.selectThemePostCall.emit();
    });
  }

  stopWriteBoard(themeId: number) {
    this.adminViewService.stopWriteBoardTheme(themeId).subscribe( () => {})
  }
}
