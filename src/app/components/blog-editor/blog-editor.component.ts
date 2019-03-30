import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Post } from 'src/app/models/Post';
import { AppUser } from 'src/app/models/appuser';
import { BlogService } from 'src/app/services/blog.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-blog-editor',
  templateUrl: './blog-editor.component.html',
  styleUrls: ['./blog-editor.component.scss'],
  providers: [DatePipe]
})
export class BlogEditorComponent implements OnInit {

  public Editor = ClassicEditor;
  ckeConfig: any;
  public postData = new Post();
  appUser: AppUser;
  formTitle = 'Add';
  postId;

  constructor(private _route: ActivatedRoute,
    private datePipe: DatePipe,
    private blogService: BlogService,
    private _router: Router,
    private authService: AuthService) {
    if (this._route.snapshot.params['id']) {
      this.postId = this._route.snapshot.paramMap.get('id');
    }
    authService.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  ngOnInit() {
    this.setEditorConfig();
    if (this.postId) {
      this.formTitle = 'Edit';
      this.blogService.getPostbyId(this.postId).subscribe(
        result => {
          this.setPostFormData(result);
        }
      );
    }
  }
  setPostFormData(postFormData) {
    this.postData.title = postFormData.title;
    this.postData.content = postFormData.content;
  }

  saveBlogPost() {
    if (this.postId) {
      this.blogService.updatePost(this.postId, this.postData).then(
        result => {
          this._router.navigate(['/']);
        }
      );
    } else {
      this.postData.createdDate = this.datePipe.transform(Date.now(), 'MM-dd-yyyy HH:mm');
      this.postData.author = this.appUser.name;
      this.blogService.createPost(this.postData).then(
        result => {
          this._router.navigate(['/']);
        }
      );
    }
  }

  setEditorConfig() {
    this.ckeConfig = {
      removePlugins: ['ImageUpload', 'MediaEmbed'],
      heading: {
        options: [
          { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
          { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
          { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
          { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
          { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
          { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
          { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' },
          { model: 'Formatted', view: 'pre', title: 'Formatted' },
        ]
      }
    };
  }

  cancel() {
    this._router.navigate(['/']);
  }

}
