import { ChangeDetectionStrategy, Component } from "@angular/core";
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorProfileComponent {
  twitterIcon = faTwitter;
  facebookIcon = faFacebook;
  githubIcon = faGithub;
  linkedinIcon = faLinkedin;
}
