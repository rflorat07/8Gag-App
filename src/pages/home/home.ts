import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { SubirPage } from './../subir/subir';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  posts: FirebaseListObservable<any[]>;

  constructor(public modalCtrl: ModalController, private afDB: AngularFireDatabase) {
    this.posts = afDB.list('/posts');
  }

  mostrar_modal() {
    this.modalCtrl.create(SubirPage).present();
  }

}
