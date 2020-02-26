import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/models/appuser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  appUser: AppUser;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

}
