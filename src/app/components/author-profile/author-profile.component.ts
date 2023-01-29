import { Component } from "@angular/core";
import {
  faTwitter,
  faFacebook,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: "app-author-profile",
  templateUrl: "./author-profile.component.html",
  styleUrls: ["./author-profile.component.scss"],
})
export class AuthorProfileComponent {
  twitterIcon = faTwitter;
  facebooIcon = faFacebook;
  githubIcon = faGithub;
  linkedinIcon = faLinkedin;
}
