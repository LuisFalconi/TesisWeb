import { HomeComponent } from './home/home.component';
import { LoginGuardService } from './_service/login-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlatoComponent } from './pages/plato/plato.component';
import { PlatoEdicionComponent } from './pages/plato/plato-edicion/plato-edicion.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { LoginComponent } from './login/login.component';
import { Not403Component } from './pages/not403/not403.component';
import { CrearUsuarioComponent } from './login/crear-usuario/crear-usuario.component';
import { EditarPerfilComponent } from './pages/editar-perfil/editar-perfil.component';
import { AgregarPerfilComponent } from './pages/editar-perfil/agregar-perfil/agregar-perfil.component';
import { MiMenuComponent } from './pages/mi-menu/mi-menu.component';
import { CrearMenuComponent } from './pages/crear-menu/crear-menu.component';
import { CrearRestauranteComponent } from './pages/crear-restaurante/crear-restaurante.component';
import { MenusComponent } from './pages/menus/menus.component';
import { SubirImagenComponent } from './_pruebas/subir-imagen/subir-imagen.component';
import { ListaRestaurantesComponent } from './restaurantes/lista-restaurantes/lista-restaurantes.component';
import { ListaClientesComponent } from './pages/cliente/lista-clientes/lista-clientes.component';
import { PromocionesComponent } from './pages/promociones/promociones.component';
import { ListaPromocionesComponent } from './pages/promociones/lista-promociones/lista-promociones.component';
import { ListaUsuariosComponent } from './usuarios/lista-usuarios/lista-usuarios.component';
import { ValidacionComponent } from './pages/validacion/validacion.component';
import { VerificacionRestaurantesComponent } from './usuarios/verificacion-restaurantes/verificacion-restaurantes.component';
import { MapaComponent } from './pages/mapa/mapa.component';


const routes: Routes = [
  {path: 'plato', component: PlatoComponent, children: [
    {path: 'nuevo', component: PlatoEdicionComponent},
    {path: 'edicion/:id', component: PlatoEdicionComponent},
    ], canActivate: [LoginGuardService]  // Permite dar seguridad a una pagina que no se quiere ver si no esta algun usuario logueado
  },
  {path: 'inicio', component: HomeComponent},
  {path: 'prueba', component: SubirImagenComponent},
  {path: 'listaR', component: ListaRestaurantesComponent, canActivate: [LoginGuardService]},
  {path: 'listaU', component: ListaUsuariosComponent, canActivate: [LoginGuardService]},
  {path: 'verificacionR', component: VerificacionRestaurantesComponent, canActivate: [LoginGuardService]},
  {path: 'cliente/:id', component: ListaClientesComponent},
  {path: 'cliente', component: ClienteComponent},
  {path: 'mapa', component: MapaComponent},
  {path: 'menus', component: MenusComponent},
  {path: 'promociones', component: PromocionesComponent},
  {path: 'listaPromociones', component: ListaPromocionesComponent, canActivate: [LoginGuardService]},
  {path: 'perfil', component: PerfilComponent, canActivate: [LoginGuardService]},
  {path: 'miMenu', component: MiMenuComponent, canActivate: [LoginGuardService]},
  // {path: 'crearRestaurante', component: CrearRestauranteComponent, canActivate: [LoginGuardService]},
  {path: 'not-403', component: Not403Component},
  {path: 'editar', component: EditarPerfilComponent, children: [
    {path: 'nuevo', component: AgregarPerfilComponent},
    {path: 'edicion/:id', component: AgregarPerfilComponent},
    ],canActivate: [LoginGuardService] 
  },
  {path: 'login', component: LoginComponent},
  {path: 'crearUsuario', component: CrearUsuarioComponent},
  // PAgina que carga por defecto
  {path:  '', redirectTo: 'inicio', pathMatch: 'full'}
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
