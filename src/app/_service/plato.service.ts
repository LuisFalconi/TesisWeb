import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Plato } from '../_model/plato';
import { Lexer } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class PlatoService {

  constructor(private afs: AngularFirestore) {
   }

   listar() {
     return this.afs.collection<Plato>('plato').valueChanges();
   }

   registrar(plato: Plato){
     // tslint:disable-next-line:prefer-const
     let idPlato = this.afs.createId();
     plato.id = idPlato;
     return this.afs.collection('plato').doc(idPlato).set({
      id: plato.id,
      nombre: plato.nombre,
      precio: plato.precio
     });
   }

  modificar(plato: Plato){
    return this.afs.collection('plato').doc(plato.id).set(JSON.parse(JSON.stringify(plato)));
  }

  leer(documentId: string){
      return this.afs.collection<Plato>('plato').doc(documentId).valueChanges();
  }

  eliminar(plato: Plato){
    return this.afs.collection('plato').doc(plato.id).delete();
}


}
