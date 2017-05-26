import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

//Plugins
import { SplashScreen } from '@ionic-native/splash-screen';
import { ImagePicker } from '@ionic-native/image-picker';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { Facebook } from '@ionic-native/facebook';


//Page
import { HomePage } from '../pages/home/home';
import { SubirPage } from './../pages/subir/subir';

//Angular Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { firebaseConfig } from './../config/firebase.config';
import { AngularFireAuthModule } from 'angularfire2/auth';

//Pipes 
import { PlaceholderPipe } from '../pipes/placeholder/placeholder';

//Providers
import { CargaArchivosProvider } from '../providers/carga-archivos/carga-archivos';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

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
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SubirPage
  ],
  providers: [
    Camera,
    Facebook,
    StatusBar,
    ImagePicker,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CargaArchivosProvider,
    AuthServiceProvider
  ]
})
export class AppModule { }
