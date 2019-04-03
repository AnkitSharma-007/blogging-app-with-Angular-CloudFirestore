import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { ShareButtonsConfig } from '@ngx-share/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgMaterialModule } from './ng-material/ng-material.module';
import { BlogComponent } from './components/blog/blog.component';
import { CommentsComponent } from './components/comments/comments.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RightpanelComponent } from './components/rightpanel/rightpanel.component';
import { ScrollerComponent } from './components/scroller/scroller.component';
import { BlogEditorComponent } from './components/blog-editor/blog-editor.component';
import { BlogCardComponent } from './components/blog-card/blog-card.component';
import { Excerpt } from './customPipes/excerpt';
import { Slug } from './customPipes/slug';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { BlogService } from './services/blog.service';
import { AuthService } from './services/auth.service';
import { SocialShareComponent } from './components/social-share/social-share.component';

const customConfig: ShareButtonsConfig = {
  include: ['facebook', 'twitter', 'linkedin', 'pinterest', 'reddit', 'whatsapp', 'print', 'email'],
  theme: 'circles-dark',
  autoSetMeta: true,
  twitterAccount: 'ankitsharma_007'
};

@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    CommentsComponent,
    HomeComponent,
    NavBarComponent,
    RightpanelComponent,
    ScrollerComponent,
    BlogEditorComponent,
    BlogCardComponent,
    Excerpt,
    Slug,
    SocialShareComponent
  ],
  imports: [
    HttpClientModule,
    ShareButtonsModule.withConfig(customConfig),
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgMaterialModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'addpost', component: BlogEditorComponent, canActivate: [AuthGuardService, AdminAuthGuardService] },
      { path: 'editpost/:id', component: BlogEditorComponent, canActivate: [AuthGuardService, AdminAuthGuardService] },
      { path: 'blog/:id/:slug', component: BlogComponent },
      { path: '**', component: HomeComponent }
    ],
      { onSameUrlNavigation: 'reload' }),
  ],
  providers: [{ provide: FirestoreSettingsToken, useValue: {} },
    BlogService,
    AuthService,
    AuthGuardService,
    AdminAuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
