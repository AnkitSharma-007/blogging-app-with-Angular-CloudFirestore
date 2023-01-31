import { Component, Input } from "@angular/core";
import { DatePipe } from "@angular/common";
import { Comments } from "src/app/models/comment";
import { CommentService } from "src/app/services/comment.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-post-comment",
  templateUrl: "./post-comment.component.html",
  styleUrls: ["./post-comment.component.scss"],
  providers: [DatePipe],
})
export class PostCommentComponent {
  @Input()
  blogId: string;

  public comments = new Comments();
  appUser$ = this.authService.appUser$;

  constructor(
    private readonly datePipe: DatePipe,
    private readonly commentService: CommentService,
    private readonly authService: AuthService
  ) {}

  onCommentPost(commentForm) {
    this.comments.commentDate = this.datePipe.transform(
      Date.now(),
      "MM-dd-yyyy HH:mm:ss"
    );
    this.comments.blogId = this.blogId;
    this.commentService
      .saveComment(this.comments)
      .then(commentForm.resetForm());
  }

  login() {
    this.authService.login();
  }
}
