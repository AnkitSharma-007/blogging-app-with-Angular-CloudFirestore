import { Component, HostListener } from "@angular/core";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-scroller",
  templateUrl: "./scroller.component.html",
  styleUrls: ["./scroller.component.scss"],
})
export class ScrollerComponent {
  showScroller: boolean;
  showScrollerPosition = 100;

  faAngleUp = faAngleUp;
  @HostListener("window:scroll")
  checkScroll() {
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    if (scrollPosition >= this.showScrollerPosition) {
      this.showScroller = true;
    } else {
      this.showScroller = false;
    }
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }
}
