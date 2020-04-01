import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { PlatoComponent } from './pages/plato/plato.component';

import {AngularFireModule} from '@angular/fire';
import { environment } from '../environments/environment';
import {FirestoreSettingsToken, AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import { PlatoEdicionComponent } from './pages/plato/plato-edicion/plato-edicion.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { ConsumoComponent } from './pages/consumo/consumo.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { DialogoComponent } from './pages/consulta/dialogo/dialogo.component';
import { LoginComponent } from './login/login.component';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { Not403Component } from './pages/not403/not403.component'; //seguridad
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { CrearUsuarioComponent } from './login/crear-usuario/crear-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    PlatoComponent,
    PlatoEdicionComponent,
    ClienteComponent,
    ConsultaComponent,
    ConsumoComponent,
    PerfilComponent,
    DialogoComponent,
    LoginComponent,
    Not403Component,
    HomeComponent,
    CrearUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    FormsModule,  
    HttpClientModule,
    AngularFireStorageModule,
    AngularFireAuthModule // logica de seguridad 
  ],
  // Para trabajar con dialogos se crea entryComoonents
  entryComponents: [
    DialogoComponent
  ],
  providers: [
      AngularFirestore,
    { provide: FirestoreSettingsToken, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
