import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore/firestore';
import { Observable } from 'rxjs';
import { Comments } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private db: AngularFirestore) { }

  saveComment(comment: Comments) {
    const commentData = JSON.parse(JSON.stringify(comment));
    return this.db.collection('comments').add(commentData);
  }

  getComments(blogId: string): Observable<any> {
    const comments = this.db.collection('comments',
      ref => ref.where('blogId', '==', blogId).orderBy('commentDate', 'desc'))
      .valueChanges();
    return comments;
  }

  deleteComment(blogId: string) {
    const commentsToDelete = this.db.collection('comments', ref => ref.where('blogId', '==', blogId)).snapshotChanges();

    commentsToDelete.forEach(
      commentList => {
        commentList.forEach(comment => {
          this.db.doc('comments/' + comment.payload.doc.id).delete();
        });
      }
    );
  }
}
