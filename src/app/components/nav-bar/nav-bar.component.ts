import { Component } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"],
})
export class NavBarComponent {
  appUser$ = this.authService.appUser$;
  githubIcon = faGithub;

  constructor(private readonly authService: AuthService) {}

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
