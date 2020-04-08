import { HomeComponent } from './home/home.component';
import { LoginGuardService } from './_service/login-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlatoComponent } from './pages/plato/plato.component';
import { PlatoEdicionComponent } from './pages/plato/plato-edicion/plato-edicion.component';
import { ConsumoComponent } from './pages/consumo/consumo.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { LoginComponent } from './login/login.component';
import { Not403Component } from './pages/not403/not403.component';
import { CrearUsuarioComponent } from './login/crear-usuario/crear-usuario.component';
import { EditarPerfilComponent } from './pages/editar-perfil/editar-perfil.component';
import { AgregarPerfilComponent } from './pages/editar-perfil/agregar-perfil/agregar-perfil.component';
import { MiMenuComponent } from './pages/mi-menu/mi-menu.component';


const routes: Routes = [
  {path: 'plato', component: PlatoComponent, children: [
    {path: 'nuevo', component: PlatoEdicionComponent},
    {path: 'edicion/:id', component: PlatoEdicionComponent},
    ], canActivate: [LoginGuardService]  // Permite dar seguridad a una pagina que no se quiere ver si no esta algun usuario logueado
  },
  {path: 'consumo', component: ConsumoComponent, canActivate: [LoginGuardService]},
  {path: 'inicio', component: HomeComponent},
  {path: 'consulta', component: ConsultaComponent, canActivate: [LoginGuardService]},
  {path: 'cliente', component: ClienteComponent, canActivate: [LoginGuardService]},
  {path: 'perfil', component: PerfilComponent, canActivate: [LoginGuardService]},
  {path: 'miMenu', component: MiMenuComponent, canActivate: [LoginGuardService]},
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
