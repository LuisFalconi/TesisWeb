import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlatoComponent } from './pages/plato/plato.component';


const routes: Routes = [
  {path: 'plato', component: PlatoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
