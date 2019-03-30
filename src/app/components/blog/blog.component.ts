import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/Post';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  postData: Post = new Post();
  postId;

  constructor(private _route: ActivatedRoute,
    private blogService: BlogService) {
    if (this._route.snapshot.params['id']) {
      this.postId = this._route.snapshot.paramMap.get('id');
    }
  }

  ngOnInit() {
    this.blogService.getPostbyId(this.postId).subscribe(
      (result: Post) => {
        this.postData = result;
      }
    );
  }

}
