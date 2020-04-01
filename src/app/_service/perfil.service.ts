import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Perfil } from '../_model/perfil';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  //Variable para validar el estado del usuario
  //user: Observable<Perfil>;
  constructor(private afs: AngularFirestore) { }

  listar() {
    return this.afs.collection<Perfil>('perfiles').valueChanges();
  }

  // Registrar el perfil
  registrar(perfil: Perfil){

    // Debido a que estamos validadndo en lato edicion que se guarde con el IDno necesitamos esto
    // let idPlato = this.afs.createId();
    // plato.id = idPlato;
    return this.afs.collection('perfiles').doc(perfil.id).set({
     id: perfil.id,
     //userUID: perfil.userUID,
     nombreRestaurante: perfil.nombreRestaurante,
     fotoRestaurrate: perfil.fotoRestaurante,
     tipoRestaurante: perfil.tipoRestaurante,
     capacidadRestaurante: perfil.capacidadRestaurante,
     horarioRestaurante: perfil.capacidadRestaurante,
     direccionRestaurante: perfil.direccionRestaurante,
    });
  }


  modificar(perfil: Perfil){
    // return this.afs.collection('plato').doc(plato.id).set(JSON.parse(JSON.stringify(plato)));
    // Objetc.assign() Para transformar el contenido de un objeto normal a un 
    // tipo JSOn una mejor forma de JSON.parse
    return this.afs.collection('perfiles').doc(perfil.id).set(Object.assign({}, perfil));	
  }

  leer(documentId: string){
    return this.afs.collection<Perfil>('perfiles').doc(documentId).valueChanges();
}

  // eliminar(perfil: Perfil){
  //   return this.afs.collection('perfiles').doc(perfil.id).delete();
  // }


}


