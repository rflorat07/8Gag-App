import { Component } from '@angular/core';
import { ModalController, ToastController } from 'ionic-angular';

import { SocialSharing } from '@ionic-native/social-sharing';

import { SubirPage } from './../subir/subir';

//Providers
import { CargaArchivosProvider } from './../../providers/carga-archivos/carga-archivos';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  hayMas: boolean = true;

  constructor(
    public modalCtrl: ModalController,
    private cargaArchivosProvider: CargaArchivosProvider,
    private authServiceProvider: AuthServiceProvider,
    private socialSharing: SocialSharing,
    private toastCtrl: ToastController) {
    this.cargaArchivosProvider.cargar_imagenes().then();
  }

  mostrar_modal() {
    this.modalCtrl.create(SubirPage).present();
  }

  compartir(post: any) {
    this.socialSharing.shareViaFacebook(post.titulo, post.img).then(() => {
      // Sharing via Facebook is possible
      this.mostrar_toast("Compartido correctamente");
    }).catch((error) => {
      // Sharing via Facebook is not possible
      this.mostrar_toast("Error: " + error);
    });
  }

  signInWithFacebook() {
    this.authServiceProvider.signInWithFacebook()
      .then(res => this.onSignINSuccess(res));
  }

  signOut() {
    this.authServiceProvider.signOut();
  }


  doInfinite(infiniteScroll: any) {
    console.log('Siguientes...');

    this.cargaArchivosProvider.cargar_imagenes()
      .then((existenMas: boolean) => {
        infiniteScroll.complete();
        this.hayMas = existenMas;
      });
  }

  private onSignINSuccess(res: any): void {
    console.log("Facebook nombre ", res.user.displayName);

  }

  private mostrar_toast(texto: string) {
    this.toastCtrl.create({
      message: texto,
      duration: 2500
    }).present();
  }

}
