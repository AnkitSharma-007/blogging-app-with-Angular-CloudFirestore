import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BlogService } from "src/app/services/blog.service";
import { Post } from "src/app/models/post";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { CommentService } from "src/app/services/comment.service";
import { SnackbarService } from "src/app/services/snackbar.service";
import { combineLatestWith, map } from "rxjs/operators";
import { AppUser } from "src/app/models/appuser";

class Vm {
  blogList: Post[];
  appUser: AppUser;

  constructor() {
    this.blogList = [];
    this.appUser = new AppUser();
  }
}

@Component({
  selector: "app-blog-card",
  templateUrl: "./blog-card.component.html",
  styleUrls: ["./blog-card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogCardComponent {
  config: any;
  pageSizeOptions = [];

  vm$ = this.activatedRoute.paramMap.pipe(
    combineLatestWith(
      this.blogService.getAllPosts(),
      this.authService.appUser$
    ),
    map(([params, blogs, appUser]) => {
      let blogVm = new Vm();

      this.config.currentPage = Number(params.get("pagenum"));
      blogVm.blogList = blogs;
      blogVm.appUser = appUser;

      return blogVm;
    })
  );

  constructor(
    private readonly blogService: BlogService,
    private readonly commentService: CommentService,
    private readonly authService: AuthService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly snackBarService: SnackbarService
  ) {
    this.pageSizeOptions = [2, 4, 6];
    const pageSize = sessionStorage.getItem("pageSize");
    this.config = {
      currentPage: 1,
      itemsPerPage: pageSize ? +pageSize : this.pageSizeOptions[0],
    };
  }

  delete(postId: string) {
    if (confirm("Are you sure?")) {
      this.blogService.deletePost(postId).then(() => {
        this.commentService.deleteAllCommentForBlog(postId);
        this.snackBarService.showSnackBar("Blog post deleted successfully");
      });
    }
  }
}
