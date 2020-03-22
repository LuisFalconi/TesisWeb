import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Plato } from '../_model/plato';

@Injectable({
  providedIn: 'root'
})
export class PlatoService {

  constructor(private afs: AngularFirestore) {
   }

   listar() {
     return this.afs.collection<Plato>('plato').valueChanges();
   }
}
