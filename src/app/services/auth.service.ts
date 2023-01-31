import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { AppUser } from "../models/appuser";
import firebase from "firebase/compat/app";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  appUser$: Observable<AppUser>;

  constructor(
    private readonly afAuth: AngularFireAuth,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly db: AngularFirestore
  ) {
    // Get the auth state, then fetch the Firestore user document or return null
    this.appUser$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        // If the user is logged in, return the user details.
        if (user) {
          return this.db.doc<AppUser>(`appusers/${user.uid}`).valueChanges();
        } else {
          // If the user is NOT logged in, return null.
          return of(null);
        }
      })
    );
  }

  async login() {
    // Store the return URL in localstorage, to be used once the user logs in successfully
    const returnUrl =
      this.route.snapshot.queryParamMap.get("returnUrl") || this.router.url;
    localStorage.setItem("returnUrl", returnUrl);

    const credential = await this.afAuth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
    return this.updateUserData(credential.user);
  }

  async logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(["/"]);
    });
  }

  // Save the user data to firestore on login
  private updateUserData(user) {
    const userRef = this.db.doc(`appusers/${user.uid}`);
    const data = {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    };
    return userRef.set(data, { merge: true });
  }
}
