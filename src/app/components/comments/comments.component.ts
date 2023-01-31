import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { AppUser } from "src/app/models/appuser";
import { Comments } from "src/app/models/comment";
import { CommentService } from "src/app/services/comment.service";
import { AuthService } from "src/app/services/auth.service";
import { combineLatestWith, map } from "rxjs/operators";
import { SnackbarService } from "src/app/services/snackbar.service";
import { Observable } from "rxjs";

class Vm {
  commentList: Comments[];
  appUser: AppUser;

  constructor() {
    this.commentList = [];
    this.appUser = new AppUser();
  }
}

@Component({
  selector: "app-comments",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent {
  @Input()
  set blogId(value: string) {
    this.vm$ = this.commentService.getAllCommentsForBlog(value).pipe(
      combineLatestWith(this.authService.appUser$),
      map(([comments, user]) => {
        let commentVm = new Vm();

        commentVm.appUser = user;
        commentVm.commentList = comments;

        return commentVm;
      })
    );
  }

  vm$: Observable<Vm>;

  constructor(
    private readonly commentService: CommentService,
    private readonly authService: AuthService,
    private readonly snackBarService: SnackbarService
  ) {}

  deleteComment(commentId) {
    if (confirm("Do you want to delete this comment!!!")) {
      this.commentService.deleteSingleComment(commentId).then(() => {
        this.snackBarService.showSnackBar("Comment Deleted successfully");
      });
    }
  }
}
