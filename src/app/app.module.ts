import { ModalEditarAlmuerzoComponent } from './modal/modal-editar-almuerzo/modal-editar-almuerzo.component';
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
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AddMenuModalComponent } from './modal/add-menu-modal/add-menu-modal.component';
import { EditMenuModalComponent } from './modal/edit-menu-modal/edit-menu-modal.component';
import { EditMenusComponent } from './restaurantes/edit-menus/edit-menus.component';
import { ListaPromocionesComponent } from './pages/promociones/lista-promociones/lista-promociones.component';
import { ListaUsuariosComponent } from './usuarios/lista-usuarios/lista-usuarios.component';
import { ValidacionComponent } from './pages/validacion/validacion.component';
import { VerificacionRestaurantesComponent } from './usuarios/verificacion-restaurantes/verificacion-restaurantes.component';
import { ModalEditRestaurantDuenoComponent } from './modal/modal-edit-restaurant-dueno/modal-edit-restaurant-dueno.component';
import { EditRestauranteDuenoComponent } from './restaurantes/edit-restaurante-dueno/edit-restaurante-dueno.component';
import { AppPassDirective } from './_directivas/app-pass.directive';
import { InfoPerfilComponent } from './pages/info-perfil/info-perfil.component';
import { EditCoordenadasModalComponent } from './modal/edit-coordenadas-modal/edit-coordenadas-modal.component';
import { EditCoordenadasRestaurantComponent } from './restaurantes/edit-coordenadas-restaurant/edit-coordenadas-restaurant.component';
import { PromocionesInicioComponent } from './pages/promociones/promociones-inicio/promociones-inicio.component';
import { VerficacionEmailComponent } from './pages/verficacion-email/verficacion-email.component';
import { ClientesComponent } from './home/clientes/clientes.component';
import { AboutComponent } from './home/about/about.component';
import { ContactosComponent } from './home/contactos/contactos.component';
import { PromocionesHomeComponent } from './home/promociones-home/promociones-home.component';
import { ModalDesayunoComponent } from './modal/modal-desayuno/modal-desayuno.component';
import { CrearDesayunoComponent } from './pages/platos/crear-desayuno/crear-desayuno.component';
import { EditarDesayunoComponent } from './pages/platos/editar-desayuno/editar-desayuno.component';
import { ModalEditarDesayunoComponent } from './modal/modal-editar-desayuno/modal-editar-desayuno.component';
import { EditDesayunoComponent } from './restaurantes/edit-desayuno/edit-desayuno.component';
import { CrearAlmuerzoComponent } from './pages/platos/crear-almuerzo/crear-almuerzo.component';
import { EditarAlmuerzoComponent } from './pages/platos/editar-almuerzo/editar-almuerzo.component';
import { EditAlmuerzoComponent } from './restaurantes/edit-almuerzo/edit-almuerzo.component';
import { ModalAlmuerzoComponent } from './modal/modal-almuerzo/modal-almuerzo.component';
import { EditarMeriendaComponent } from './pages/platos/editar-merienda/editar-merienda.component';
import { CrearMeriendaComponent } from './pages/platos/crear-merienda/crear-merienda.component';
import { ModalEditarMeriendaComponent } from './modal/modal-editar-merienda/modal-editar-merienda.component';
import { EditMeriendaComponent } from './restaurantes/edit-merienda/edit-merienda.component';
import { ModalMeriendaComponent } from './modal/modal-merienda/modal-merienda.component';
import { ModalPromocionesComponent } from './modal/modal-promociones/modal-promociones.component';
import { ListaPromosComponent } from './home/lista-promos/lista-promos.component';


@NgModule({
  declarations: [
    AppComponent,
    PlatoComponent,
    PlatoEdicionComponent,
    ClienteComponent,
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
    PromocionesComponent,
    AddMenuModalComponent,
    EditMenuModalComponent,
    EditMenusComponent,
    ListaPromocionesComponent,
    ListaUsuariosComponent,
    ValidacionComponent,
    VerificacionRestaurantesComponent,
    ModalEditRestaurantDuenoComponent,
    EditRestauranteDuenoComponent,
    AppPassDirective,
    InfoPerfilComponent,
    EditCoordenadasModalComponent,
    EditCoordenadasRestaurantComponent,
    PromocionesInicioComponent,
    VerficacionEmailComponent,
    ClientesComponent,
    AboutComponent,
    ContactosComponent,
    PromocionesHomeComponent,
    ModalDesayunoComponent,
    CrearDesayunoComponent,
    EditarDesayunoComponent,
    ModalEditarDesayunoComponent,
    EditDesayunoComponent,
    CrearAlmuerzoComponent,
    EditarAlmuerzoComponent,
    ModalEditarAlmuerzoComponent,
    EditAlmuerzoComponent,
    ModalAlmuerzoComponent,
    EditarMeriendaComponent,
    CrearMeriendaComponent,
    ModalEditarMeriendaComponent,
    EditMeriendaComponent,
    ModalMeriendaComponent,
    ModalPromocionesComponent,
    ListaPromosComponent,
    
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
    AngularFireDatabaseModule,
    HttpClientModule,
    AngularFireStorageModule,
    AngularFireAuthModule // logica de seguridad 
  ],
  // Para trabajar con dialogos se crea entryComoonents
  entryComponents: [
    ModalComponent, // Modal para nuevo Restaurante
    NuevoResComponent, // Modal para nuevo Restaurante
    ModalEditRestautanteComponent,// Modal para editar Restaurante
    AddMenuModalComponent,
    EditMenuModalComponent,
    ModalEditRestaurantDuenoComponent,
    EditCoordenadasModalComponent,
    ModalDesayunoComponent,
    ModalEditarDesayunoComponent,
    ModalAlmuerzoComponent,
    ModalEditarAlmuerzoComponent,
    ModalMeriendaComponent,
    ModalEditarMeriendaComponent,
    ModalPromocionesComponent
  ],
  providers: [
      AngularFirestore,
    { provide: FirestoreSettingsToken, useValue: {} },
    { provide: StorageBucket, useValue: 'gs://muertosdehambre.appspot.com'} // Sirve par subir archivos a Firebase
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
