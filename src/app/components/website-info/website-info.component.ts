import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-website-info",
  templateUrl: "./website-info.component.html",
  styleUrls: ["./website-info.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebsiteInfoComponent {}
