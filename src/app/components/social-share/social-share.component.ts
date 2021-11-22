import { Component } from "@angular/core";
import { ShareService } from "ngx-sharebuttons";

@Component({
  selector: "app-social-share",
  templateUrl: "./social-share.component.html",
  styleUrls: ["./social-share.component.scss"],
})
export class SocialShareComponent {
  constructor(public share: ShareService) {}
}
