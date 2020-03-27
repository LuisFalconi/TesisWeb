import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { PlatoComponent } from './pages/plato/plato.component';

import {AngularFireModule} from '@angular/fire';
import { environment } from '../environments/environment';
import {FirestoreSettingsToken, AngularFirestore} from '@angular/fire/firestore';
import { PlatoEdicionComponent } from './pages/plato/plato-edicion/plato-edicion.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PlatoComponent,
    PlatoEdicionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
      AngularFirestore,
    { provide: FirestoreSettingsToken, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
