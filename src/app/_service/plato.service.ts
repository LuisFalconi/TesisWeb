import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Plato } from '../_model/plato';
import { Lexer } from '@angular/compiler';
import { imgMenu } from '../_model/imagenesMenu';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { LoginService } from './login.service';
import { finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlatoService {

  usuarioLogeado: string;
  private platoCollection: AngularFirestoreCollection<Plato>;
  private filePath: any;
  private UrlImagen: Observable<string>;
   

  constructor(private afs: AngularFirestore,
              private storage: AngularFireStorage,
              private loginService: LoginService) {


    this.loginService.user.subscribe(data =>{
    this.usuarioLogeado = data.uid;
    });

    this.platoCollection = afs.collection<Plato>('plato');

   }

   listar() {
     return this.afs.collection<Plato>('plato').valueChanges();
   }

   // Metodo recuperar los datos de la coleccion de Perfil, iterando por el id que devuelve 
  recuperarMenus(): Observable<Plato[]>{
    return this.afs
      .collection('plato')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a =>{
          const data = a.payload.doc.data() as Plato;
          const id = a.payload.doc.id;
          return {id, ...data}; //SPREAD OPERATOR
        }))
      );
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
      entradaAlmuerzo: plato.entradaAlmuerzo,
      jugoAlmuerzo: plato.jugoAlmuerzo,
      segundoAlmuerzo: plato.segundoAlmuerzo,
      precioAlmuerzo: plato.precioAlmuerzo, 
      //platoEspecial: plato.platoEspecial,
      //detalleEspecial: plato.detalleEspecial,
      //precioEspecial: plato.precioEspecial, 
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

public editarMenu(plato: Plato, nuevaImagen?: imgMenu){
  if(nuevaImagen){
    this.obtenerImagen(plato, nuevaImagen);
  }else{
    return this.platoCollection.doc(plato.id).update(plato);
  }
}

subirMenuconImagen(menus: Plato, image: imgMenu): void{
  this.subirImagen(menus, image);
}


private guardarMenu(plato: Plato) {

      //this.idRes =perfil.id;
      let idExiste = plato.id;
      if(idExiste){
        const menuObj = {
          //id: perfil.id,
          userUID: this.usuarioLogeado,
          platoDesayuno: plato.platoDesayuno,
          detalleDesayuno: plato.detalleDesayuno,
          precioDesayuno: plato.precioDesayuno, 
          entradaAlmuerzo: plato.entradaAlmuerzo,
          jugoAlmuerzo: plato.jugoAlmuerzo,
          segundoAlmuerzo: plato.segundoAlmuerzo,
          precioAlmuerzo: plato.precioAlmuerzo, 
          imgPlato: this.UrlImagen,
          fileRef: this.filePath
        };
        console.log("Estoy editando un menu");
        console.log("ID: ", idExiste);
        return this.platoCollection.doc(plato.id).update(menuObj);      
      }else{      
        let idPlato = this.afs.createId();
        plato.id = idPlato;
        this.afs.collection('plato').doc(idPlato).set({
          id: plato.id,
          userUID: this.usuarioLogeado,
          platoDesayuno: plato.platoDesayuno,
          detalleDesayuno: plato.detalleDesayuno,
          precioDesayuno: plato.precioDesayuno, 
          entradaAlmuerzo: plato.entradaAlmuerzo,
          jugoAlmuerzo: plato.jugoAlmuerzo,
          segundoAlmuerzo: plato.segundoAlmuerzo,
          precioAlmuerzo: plato.precioAlmuerzo, 
          imgPlato: this.UrlImagen,
          fileRef: this.filePath
        });
      }
 }

 private guardarMenuSinPlatoEspecial(plato: Plato) {
    
  let idPlato = this.afs.createId();
  plato.id = idPlato;
  this.afs.collection('plato').doc(idPlato).set({
    id: plato.id,
    userUID: this.usuarioLogeado,
    platoDesayuno: plato.platoDesayuno,
    detalleDesayuno: plato.detalleDesayuno,
    precioDesayuno: plato.precioDesayuno, 
    entradaAlmuerzo: plato.entradaAlmuerzo,
    jugoAlmuerzo: plato.jugoAlmuerzo,
    segundoAlmuerzo: plato.segundoAlmuerzo,
    precioAlmuerzo: plato.precioAlmuerzo, 
    //platoEspecial: plato.platoEspecial,
    imgPlato: "",
    fileRef: ""
  });
 }

 

 private subirImagen(plato: Plato ,image?: imgMenu){
  if(image){
    this.filePath = `imagenesM/${image.names}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
        fileRef.getDownloadURL().subscribe(urlImage => {
            this.UrlImagen = urlImage;
            //console.log('urlImagen', this.UrlImagen);
            this.guardarMenu(plato);     
          });
      })
      ).subscribe();
    }else{
      this.guardarMenuSinPlatoEspecial(plato);
    }

  }

  // Estoy repitiendo codigo, lo se 
  private obtenerImagen(plato: Plato ,image?: imgMenu){
      this.filePath = `imagenesM/${image.names}`;
      const fileRef = this.storage.ref(this.filePath);
      const task = this.storage.upload(this.filePath, image);
      task.snapshotChanges()
        .pipe(
          finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
              this.UrlImagen = urlImage;
              //console.log('urlImagen', this.UrlImagen);
              this.guardarMenu(plato);     
            });
        })
        ).subscribe();
    }
  

}
