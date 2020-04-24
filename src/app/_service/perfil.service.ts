import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Perfil } from '../_model/perfil';
import { Observable, EMPTY } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap, map, finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { FileI } from '../_model/imagenes';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  // Variable para validar el estado del usuario
  user: Observable<Perfil>;
   private perfilCollection: AngularFirestoreCollection<Perfil>;
   private filePath: any;
   private UrlImagen: Observable<string>;
   usuarioLogeado: string;
   idPerfil: string;
   
   

  constructor(private afs: AngularFirestore, private afa: AngularFireAuth, private storage: AngularFireStorage, private loginService: LoginService) { 
    this.user = this.afa.authState.pipe(
      switchMap( user => {
        if(user){
          return this.afs.doc<Perfil>(`usuarios/${user.uid}`).valueChanges();
        }else {
          return EMPTY;
        }
      })
    )
    this.perfilCollection = afs.collection<Perfil>('perfiles');

    this.loginService.user.subscribe(data =>{
    this.usuarioLogeado = data.uid;

    //this.idPerfil = this.afs.createId();

    })
  }



  listar() {
    return this.afs.collection<Perfil>('perfiles').valueChanges();
    //return this.afs.collection<Perfil>('perfiles').snapshotChanges();
  }

  recuperar() {
    return this.afs.collection<Perfil>('perfiles').snapshotChanges();
    //return this.afs.collection<Perfil>('perfiles').snapshotChanges();
  }

  // Metodo recuperar los datos de la coleccion de Perfil, iterando por el id que devuelve 
  recuperarDatos(): Observable<Perfil[]>{
    return this.afs
      .collection('perfiles')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a =>{
          const data = a.payload.doc.data() as Perfil;
          const id = a.payload.doc.id;
          return {id, ...data}; //SPREAD OPERATOR
        }))
      );
  }

  // Metodo usado para recibir el perfil del restaurante por ID
  public recibirPerfil(id: Perfil): Observable<Perfil> {
    return this.afs.doc<Perfil>(`perfiles/${id}`).valueChanges();
  }

  // Registrar el perfil
  registrar(perfil: Perfil){

    // Debido a que estamos validadndo en lato edicion que se guarde con el IDno necesitamos esto
    // let idPlato = this.afs.createId();
    // plato.id = idPlato;
    return this.afs.collection('perfiles').doc(perfil.id).set({
     id: perfil.id,
     userUID: perfil.userUID,
     nombreRestaurante: perfil.nombreRestaurante,
     fotoRestaurante: perfil.fotoRestaurante,
     tipoRestaurante: perfil.tipoRestaurante,
     capacidadRestaurante: perfil.capacidadRestaurante,
     horarioRestaurante: perfil.horarioRestaurante,
     direccionRestaurante: perfil.direccionRestaurante,
     //imagenRes: perfil.imagen
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

  eliminar(perfil: Perfil){
    return this.afs.collection('perfiles').doc(perfil.id).delete();
  }

  // Prueba
  eliminarPorID(perfil: Perfil) {
    return this.perfilCollection.doc(perfil.id).delete();
  }

   subirPerfilconImagen(perfiles: Perfil, image?: FileI): void{
     this.subirImagen(perfiles, image);
   }

  private guardarRestaurante(perfil: Perfil) {
    
    let idPlato = this.afs.createId();
    perfil.id = idPlato;
    this.afs.collection('perfiles').doc(idPlato).set({
      id: perfil.id,
      userUID: this.usuarioLogeado,
      nombreRestaurante: perfil.nombreRestaurante,
      fotoRestaurante: perfil.fotoRestaurante,
      tipoRestaurante: perfil.tipoRestaurante,
      capacidadRestaurante: perfil.capacidadRestaurante,
      horarioRestaurante: perfil.horarioRestaurante,
      direccionRestaurante: perfil.direccionRestaurante,
      imagenRes: this.UrlImagen,
      fileRef: this.filePath
    });
    //   const postObj = {
       
    //  };
        //this.perfilCollection.add(postObj);
   }

   private guardarRestauranteSinFoto(perfil: Perfil) {
    
    let idPlato = this.afs.createId();
    perfil.id = idPlato;
    this.afs.collection('perfiles').doc(idPlato).set({
      id: perfil.id,
      userUID: this.usuarioLogeado,
      nombreRestaurante: perfil.nombreRestaurante,
      fotoRestaurante: perfil.fotoRestaurante,
      tipoRestaurante: perfil.tipoRestaurante,
      capacidadRestaurante: perfil.capacidadRestaurante,
      horarioRestaurante: perfil.horarioRestaurante,
      direccionRestaurante: perfil.direccionRestaurante,
      //imagenRes: this.UrlImagen,
      //fileRef: this.filePath
    });
    //   const postObj = {
       
    //  };
        //this.perfilCollection.add(postObj);
   }

  

    private subirImagen(perfil: Perfil ,image?: FileI){
    if(image){
      this.filePath = `imagenes/${image.name}`;
      const fileRef = this.storage.ref(this.filePath);
      const task = this.storage.upload(this.filePath, image);
      task.snapshotChanges()
       .pipe(
         finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
             this.UrlImagen = urlImage;
             console.log('urlImagen', this.UrlImagen);
             this.guardarRestaurante(perfil);           
           });
        }) 
       ).subscribe();
    }else{
      this.guardarRestauranteSinFoto(perfil);
    }
     
   }

   private subirPromocion(perfil: Perfil ,image?: FileI){
    if(image){
      this.filePath = `imagenes/${image.name}`;
      const fileRef = this.storage.ref(this.filePath);
      const task = this.storage.upload(this.filePath, image);
      task.snapshotChanges()
       .pipe(
         finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
             this.UrlImagen = urlImage;
             console.log('urlImagen', this.UrlImagen);
             this.guardarRestaurante(perfil);           
           });
        })
       ).subscribe();
    }else{
      this.guardarRestauranteSinFoto(perfil);
    }
     
   }

   




}


