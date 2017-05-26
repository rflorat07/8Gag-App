import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Facebook } from '@ionic-native/facebook';


@Injectable()
export class AuthServiceProvider {

  authState;

  constructor(
    private afAuth: AngularFireAuth,
    private fb: Facebook,
    private platform: Platform) {

    afAuth.authState.subscribe((user: firebase.User) => {
      if (!user) {
        this.authState = null;
        return;
      }
      this.authState = user;
    });
  }

  signInWithFacebook() {
    if (this.platform.is('cordova')) {
      return this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return firebase.auth().signInWithCredential(facebookCredential);
      })
    }
    else {
      return this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider());
    }
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }


  signOut() {
    this.afAuth.auth.signOut();
  }

}
