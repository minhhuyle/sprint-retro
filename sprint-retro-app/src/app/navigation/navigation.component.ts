import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mle-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  private _navLinks: string[] = ["View board", "Write board"];
  private selectedNavLink : string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.selectedNavLink = "View board";
  }


  get navLinks(): string[] {
    return this._navLinks;
  }

  isSelected(navLink: string): string {
    return (navLink === this.selectedNavLink) ? "active" : "";
  }

  selectNavLink(navLink: string) {
    if(this.selectedNavLink !== navLink) {
      this.selectedNavLink = navLink;
      switch (this.selectedNavLink) {
        case "View board":
          this.router.navigateByUrl('/');
          break;
        case "Write board":
          this.router.navigateByUrl('/retro');
          break;
      }
    }
  }

}
