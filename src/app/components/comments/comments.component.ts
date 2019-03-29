import { Component, OnInit, Input } from '@angular/core';
import { AppUser } from '../models/appuser';
import { Comments } from '../models/comment';
import { DatePipe } from '@angular/common';
import { CommentService } from '../services/comment.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  providers: [DatePipe]
})
export class CommentsComponent implements OnInit {

  @Input()
  blogId;

  appUser: AppUser;
  public comments = new Comments();
  commentList: Comments[] = [];

  constructor(private datePipe: DatePipe,
    private commentService: CommentService,
    private authService: AuthService) {

    authService.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  ngOnInit() {
    this.getAllComments();
  }

  onCommentPost(commentForm) {
    this.comments.commentDate = this.datePipe.transform(Date.now(), 'MM-dd-yyyy HH:mm:ss');
    this.comments.blogId = this.blogId;
    this.commentService.saveComment(this.comments).then(
      commentForm.resetForm()
    );
  }

  getAllComments() {
    this.commentService.getComments(this.blogId).subscribe(result => {
      this.commentList = result;
    });
  }

  login() {
    this.authService.login();
  }

}
