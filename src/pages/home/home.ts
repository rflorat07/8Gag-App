
import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { SubirPage } from './../subir/subir';

//Providers
import { CargaArchivosProvider } from './../../providers/carga-archivos/carga-archivos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  hayMas: boolean = true;

  constructor(public modalCtrl: ModalController, private cargaArchivosProvider: CargaArchivosProvider) {
    this.cargaArchivosProvider.cargar_imagenes().then();
  }

  mostrar_modal() {
    this.modalCtrl.create(SubirPage).present();
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
