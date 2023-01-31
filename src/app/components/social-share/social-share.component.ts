import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ShareService } from "ngx-sharebuttons";

@Component({
  selector: "app-social-share",
  templateUrl: "./social-share.component.html",
  styleUrls: ["./social-share.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialShareComponent {
  constructor(public readonly share: ShareService) {}
}
