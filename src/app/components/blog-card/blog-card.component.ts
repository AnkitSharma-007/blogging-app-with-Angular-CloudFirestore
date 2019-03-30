import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { AppUser } from 'src/app/models/appuser';
import { BlogService } from 'src/app/services/blog.service';
import { CommentService } from 'src/app/services/comment.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss']
})
export class BlogCardComponent implements OnInit {

  blogPost: Post[] = [];
  appUser: AppUser;

  constructor(private blogService: BlogService,
    private commentService: CommentService,
    private authService: AuthService) {
    authService.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  ngOnInit() {
    this.getBlogPosts();
  }

  getBlogPosts() {
    this.blogService.getAllPosts().subscribe(result => {
      this.blogPost = result;
    });
  }

  delete(postId) {
    if (confirm('Are you sure')) {
      this.blogService.deletePost(postId).then(
        result => {
          this.commentService.deleteComment(postId);
        }
      );
    }
  }
}
