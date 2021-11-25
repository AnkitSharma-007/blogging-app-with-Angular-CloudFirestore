import { Component, OnInit, OnDestroy } from "@angular/core";
import { BlogService } from "src/app/services/blog.service";
import { Post } from "src/app/models/post";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { CommentService } from "src/app/services/comment.service";
import { SnackbarService } from "src/app/services/snackbar.service";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-blog-card",
  templateUrl: "./blog-card.component.html",
  styleUrls: ["./blog-card.component.scss"],
})
export class BlogCardComponent implements OnInit, OnDestroy {
  config: any;
  pageSizeOptions = [];
  blogPost$: Observable<Post[]>;
  appUser$ = this.authService.appUser$;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private blogService: BlogService,
    private commentService: CommentService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private snackBarService: SnackbarService
  ) {
    this.pageSizeOptions = [2, 4, 6];
    const pageSize = sessionStorage.getItem("pageSize");
    this.config = {
      currentPage: 1,
      itemsPerPage: pageSize ? +pageSize : this.pageSizeOptions[0],
    };
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((params: ParamMap) => {
        this.config.currentPage = params.get("pagenum");
        this.blogPost$ = this.blogService.getAllPosts();
      });
  }

  delete(postId: string) {
    if (confirm("Are you sure?")) {
      this.blogService.deletePost(postId).then(() => {
        this.commentService.deleteAllCommentForBlog(postId);
        this.snackBarService.showSnackBar("Blog post deleted successfully");
      });
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
