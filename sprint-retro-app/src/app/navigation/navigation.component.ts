import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { UserService } from '../user/login/user.service';

@Component({
  selector: 'mle-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  private _navLinks: any[] = [{
    title: "View board",
    url: '/view'
  }, {
    title: "Write board",
    url: '/write',
    access: ['USER', 'ADMIN']
  }, {
    title: "Config board",
    url: '/config',
    access: ['USER', 'ADMIN']
  }, {
    title: "Admin board",
    url: '/admin',
    access: ['ADMIN']
  }];
  private selectedNavLink : string;

  constructor(private router: Router, private userService: UserService) {}

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

  isVisibleNavBar() {
    return this.userService.isLogged();
  }

  canAccess(navLink) {
    if(navLink.access?.length > 0) {
      return navLink.access.some(val => val === this.userService.getUser().role)
    }

    return true
  }

  logOut() {
    this.userService.logOut();
  }

  getUserName(): string {
    return this.userService.getUser().userName;
  }
}
