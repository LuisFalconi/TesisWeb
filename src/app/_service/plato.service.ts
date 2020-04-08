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

     // Debido a que estamos validadndo en lato edicion que se guarde con el IDno necesitamos esto
     // let idPlato = this.afs.createId();
     // plato.id = idPlato;
     return this.afs.collection('plato').doc(plato.id).set({
      id: plato.id,
      userUID: plato.userUID,
      platoDesayuno: plato.platoDesayuno,
      detalleDesayuno: plato.detalleDesayuno,
      precioDesayuno: plato.precioDesayuno, 
      platoAlmuerzo: plato.platoAlmuerzo,
      detalleAlmuerzo: plato.detalleAlmuerzo,
      precioAlmuerzo: plato.precioAlmuerzo, 
      platoEspecial: plato.platoEspecial,
      detalleEspecial: plato.detalleEspecial,
      precioEspecial: plato.precioEspecial, 
     });
   }

  modificar(plato: Plato){
    // return this.afs.collection('plato').doc(plato.id).set(JSON.parse(JSON.stringify(plato)));
    // Objetc.assign() Para transformar el contenido de un objeto normal a un 
    // tipo JSOn una mejor forma de JSON.parse
    return this.afs.collection('plato').doc(plato.id).set(Object.assign({}, plato));	
  }

  leer(documentId: string){
      return this.afs.collection<Plato>('plato').doc(documentId).valueChanges();
  }

  eliminar(plato: Plato){
    return this.afs.collection('plato').doc(plato.id).delete();
}


}
