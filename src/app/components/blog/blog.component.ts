import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/Post';
import { BlogService } from 'src/app/services/blog.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit, OnDestroy {

  postData: Post = new Post();
  postId;
  private unsubscribe$ = new Subject<void>();

  constructor(private _route: ActivatedRoute,
    private blogService: BlogService) {
    if (this._route.snapshot.params['id']) {
      this.postId = this._route.snapshot.paramMap.get('id');
    }
  }

  ngOnInit() {
    this.blogService.getPostbyId(this.postId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result: Post) => {
          this.postData = result;
        }
      );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
