import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'mle-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  private _navLinks: any[] = [{
    title: "View board",
    url: '/'
  }, {
    title: "Write board",
    url: '/retro'
  }, {
    title: "Config board",
    url: '/config'
  }];
  private selectedNavLink : string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe( (event: RouterEvent) => {
      if(event instanceof NavigationEnd) {
        if(this.selectedNavLink !== event.url) {
          this.selectedNavLink = event.url;
        }
      }
    })
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
      this.router.navigateByUrl(this.selectedNavLink);
    }
  }

}
