

import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

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
    private authServiceProvider: AuthServiceProvider) {
    this.cargaArchivosProvider.cargar_imagenes().then();
  }

  mostrar_modal() {
    this.modalCtrl.create(SubirPage).present();
  }

  signInWithFacebook() {
    this.authServiceProvider.signInWithFacebook()
      .then(res => this.onSignINSuccess(res));
  }

  signOut() {
    this.authServiceProvider.signOut();
  }

  private onSignINSuccess(res: any): void {
    console.log("Facebook nombre ",res.user.displayName);

  }

  doInfinite(infiniteScroll: any) {
    console.log('Siguientes...');

    this.cargaArchivosProvider.cargar_imagenes()
      .then((existenMas: boolean) => {
        infiniteScroll.complete();
        this.hayMas = existenMas;
      });
  }

}
