import { Component, OnInit, OnDestroy } from "@angular/core";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Post } from "src/app/models/post";
import { DatePipe } from "@angular/common";
import { BlogService } from "src/app/services/blog.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AppUser } from "src/app/models/appuser";
import { AuthService } from "src/app/services/auth.service";
import { EMPTY, ReplaySubject } from "rxjs";
import { switchMap, takeUntil } from "rxjs/operators";

@Component({
  selector: "app-blog-editor",
  templateUrl: "./blog-editor.component.html",
  styleUrls: ["./blog-editor.component.scss"],
  providers: [DatePipe],
})
export class BlogEditorComponent implements OnInit, OnDestroy {
  public Editor = ClassicEditor;
  ckeConfig: any;
  postData = new Post();
  formTitle = "Add";
  postId;
  appUser: AppUser;
  private destroyed$ = new ReplaySubject<void>(1);

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly datePipe: DatePipe,
    private readonly blogService: BlogService,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
    this.setEditorConfig();
  }

  ngOnInit() {
    this.authService.appUser$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((appUser) => (this.appUser = appUser));

    this.fetchBlogDetails();
  }

  saveBlogPost() {
    if (this.postId) {
      this.blogService.updatePost(this.postId, this.postData).then(() => {
        this.navigateToHome();
      });
    } else {
      this.postData.createdDate = this.datePipe.transform(
        Date.now(),
        "MM-dd-yyyy HH:mm"
      );
      this.postData.author = this.appUser.name;
      this.blogService.createPost(this.postData).then(() => {
        this.navigateToHome();
      });
    }
  }

  navigateToHome() {
    this.router.navigate(["/"]);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private setPostFormData(postFormData) {
    this.postData.title = postFormData.title;
    this.postData.content = postFormData.content;
  }

  private setEditorConfig() {
    this.ckeConfig = {
      removePlugins: ["ImageUpload", "MediaEmbed", "EasyImage"],
      heading: {
        options: [
          {
            model: "paragraph",
            title: "Paragraph",
            class: "ck-heading_paragraph",
          },
          {
            model: "heading1",
            view: "h1",
            title: "Heading 1",
            class: "ck-heading_heading1",
          },
          {
            model: "heading2",
            view: "h2",
            title: "Heading 2",
            class: "ck-heading_heading2",
          },
          {
            model: "heading3",
            view: "h3",
            title: "Heading 3",
            class: "ck-heading_heading3",
          },
          {
            model: "heading4",
            view: "h4",
            title: "Heading 4",
            class: "ck-heading_heading4",
          },
          {
            model: "heading5",
            view: "h5",
            title: "Heading 5",
            class: "ck-heading_heading5",
          },
          {
            model: "heading6",
            view: "h6",
            title: "Heading 6",
            class: "ck-heading_heading6",
          },
          { model: "Formatted", view: "pre", title: "Formatted" },
        ],
      },
    };
  }

  private fetchBlogDetails() {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((params) => {
          this.postId = params.get("id");
          if (this.postId) {
            return this.blogService.getPostbyId(this.postId);
          } else {
            return EMPTY;
          }
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe({
        next: (result) => {
          this.setPostFormData(result);
        },
        error: (error) => {
          console.error("Error ocurred while fetching blog data : ", error);
        },
      });
  }
}
