import { Component, ChangeDetectionStrategy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BlogService } from "src/app/services/blog.service";
import { EMPTY } from "rxjs";
import { switchMap } from "rxjs/operators";
import { faCalendar, faUser } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogComponent {
  postId: string;

  faCalendar = faCalendar;
  faUser = faUser;

  blog$ = this.activatedRoute.paramMap.pipe(
    switchMap((params) => {
      this.postId = params.get("id");
      if (this.postId) {
        return this.blogService.getPostbyId(this.postId);
      } else {
        return EMPTY;
      }
    })
  );

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly blogService: BlogService
  ) {}
}
