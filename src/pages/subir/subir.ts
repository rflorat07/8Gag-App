
import { Component } from '@angular/core';
import { ViewController, ToastController, Platform, LoadingController } from 'ionic-angular';

//Plugins
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';

//Providers
import { CargaArchivosProvider } from './../../providers/carga-archivos/carga-archivos';

@Component({
  selector: 'page-subir',
  templateUrl: 'subir.html',
})
export class SubirPage {

  titulo: string = "";
  imgPreview: any = null;
  img: string = "";

  constructor(
    private platform: Platform,
    private toastCtrl: ToastController,
    private viewCtrl: ViewController,
    private camera: Camera,
    private loadingCtrl: LoadingController,
    private imagePicker: ImagePicker,
    private cargaArchivosProvider: CargaArchivosProvider) { }

  cerrar_modal() {
    this.viewCtrl.dismiss();
  }

  crear_post() {
    console.log("Subiendo imagenes");

    let archivo = {
      'titulo': this.titulo,
      'img': this.img
    }

    let loader = this.loadingCtrl.create({
      content: "Subiendo..."
    });

    loader.present();

    this.cargaArchivosProvider.cargar_imagenes_firebase(archivo)
      .then(() => {
        loader.dismiss();
        this.cerrar_modal();
      },
      (error) => {
        loader.dismiss();
        this.mostrar_toast("Error al cargar: " + error);
        console.error("Error al cargar: " + JSON.stringify(error));
      });
  }

  mostrar_camara() {

    if (!this.platform.is('cordova')) {
      this.mostrar_toast("Error: no estamos en un celular")
      return;
    }

    const options: CameraOptions = {
      quality: 40,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.imgPreview = 'data:image/jpeg;base64,' + imageData;
      this.img = imageData;
    }, (err) => {
      // Handle error
      this.mostrar_toast("Error " + err);
      console.error("Error en la camara: ", err);
    });

  }

  seleccionar_fotos() {
    if (!this.platform.is('cordova')) {
      this.mostrar_toast("Error: no estamos en un celular")
      return;
    }

    let options: ImagePickerOptions = {
      maximumImagesCount: 1,
      quality: 40,
      outputType: 1
    }

    this.imagePicker.getPictures(options).then((results) => {

      for (let img of results) {
        this.imgPreview = 'data:image/jpeg;base64,' + img;
        this.img = img;
        break;
      }

    }, (err) => {
      this.mostrar_toast("Error seleccion: " + err);
      console.error("Error seleccion: " + JSON.stringify(err));
    });

  }

  private mostrar_toast(texto: string) {
    this.toastCtrl.create({
      message: texto,
      duration: 2500
    }).present();
  }

}
