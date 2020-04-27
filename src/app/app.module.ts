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
import { AngularFireStorageModule, StorageBucket } from '@angular/fire/storage';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { ConsumoComponent } from './pages/consumo/consumo.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { LoginComponent } from './login/login.component';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { Not403Component } from './pages/not403/not403.component'; //seguridad
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { CrearUsuarioComponent } from './login/crear-usuario/crear-usuario.component';
import { EditarPerfilComponent } from './pages/editar-perfil/editar-perfil.component';
import { AgregarPerfilComponent } from './pages/editar-perfil/agregar-perfil/agregar-perfil.component';
import { MiMenuComponent } from './pages/mi-menu/mi-menu.component';
import { CrearMenuComponent } from './pages/crear-menu/crear-menu.component';
import { CrearRestauranteComponent } from './pages/crear-restaurante/crear-restaurante.component';
import { MenusComponent } from './pages/menus/menus.component';
import { SubirImagenComponent } from './_pruebas/subir-imagen/subir-imagen.component';
import { ModalComponent } from './modal/modal/modal.component';
import { ListaRestaurantesComponent } from './restaurantes/lista-restaurantes/lista-restaurantes.component';
import { ListaClientesComponent } from './pages/cliente/lista-clientes/lista-clientes.component';
import { NuevoRestauranteComponent } from './restaurantes/nuevo-restaurante/nuevo-restaurante.component';
import { NuevoResComponent } from './modal/nuevo-res/nuevo-res.component';
import { EditRestauranteComponent } from './restaurantes/edit-restaurante/edit-restaurante.component';
import { ModalEditRestautanteComponent } from './modal/modal-edit-restautante/modal-edit-restautante.component';
import { PromocionesComponent } from './pages/promociones/promociones.component';

@NgModule({
  declarations: [
    AppComponent,
    PlatoComponent,
    PlatoEdicionComponent,
    ClienteComponent,
    ConsumoComponent,
    PerfilComponent,
    LoginComponent,
    Not403Component,
    HomeComponent,
    CrearUsuarioComponent,
    EditarPerfilComponent,
    AgregarPerfilComponent,
    MiMenuComponent,
    CrearMenuComponent,
    CrearRestauranteComponent,
    MenusComponent,
    SubirImagenComponent,
    ModalComponent,
    ListaRestaurantesComponent,
    ListaClientesComponent,
    NuevoRestauranteComponent,
    NuevoResComponent,
    EditRestauranteComponent,
    ModalEditRestautanteComponent,
    PromocionesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    AngularFirestoreModule,
    FormsModule,  
    HttpClientModule,
    AngularFireStorageModule,
    AngularFireAuthModule // logica de seguridad 
  ],
  // Para trabajar con dialogos se crea entryComoonents
  entryComponents: [
    ModalComponent,
    NuevoResComponent,
    ModalEditRestautanteComponent
  ],
  providers: [
      AngularFirestore,
    { provide: FirestoreSettingsToken, useValue: {} },
    { provide: StorageBucket, useValue: 'gs://muertosdehambre.appspot.com'} // Sirve par subir archivos a Firebase
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
