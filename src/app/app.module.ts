import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

//Plugins
import { SplashScreen } from '@ionic-native/splash-screen';
import { ImagePicker } from '@ionic-native/image-picker';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';


//Page
import { HomePage } from '../pages/home/home';
import { SubirPage } from './../pages/subir/subir';

//Angular Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { firebaseConfig } from './../config/firebase.config';

//Pipes 
import { PlaceholderPipe } from '../pipes/placeholder/placeholder';

//Providers
import { CargaArchivosProvider } from '../providers/carga-archivos/carga-archivos';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SubirPage,
    PlaceholderPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SubirPage
  ],
  providers: [
    Camera,
    StatusBar,
    ImagePicker,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CargaArchivosProvider
  ]
})
export class AppModule { }
