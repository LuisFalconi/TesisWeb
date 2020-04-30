import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Promocion } from '../_model/promocion';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { FileI } from '../_model/imagenes';
import { AngularFireStorage } from '@angular/fire/storage';
import { FileP } from '../_model/promosImg';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class PromocionService {

  usuarioLogeado: string;
  private filePath: any;
  private UrlImagen: Observable<string>;
  private UrlImagen2: Observable<string>[];
  private promocionCollection: AngularFirestoreCollection<Promocion>;
  imageDetailList: AngularFireList<any>;

  constructor(private afs: AngularFirestore,
              private loginService: LoginService,
              private storage: AngularFireStorage,
              private firebase: AngularFireDatabase) { 

    this.promocionCollection = afs.collection<Promocion>('promociones');
    
    // Metodo para traer el ID del usuario logueado
    this.loginService.user.subscribe(data =>{
      this.usuarioLogeado = data.uid;
    });

  }

  getImageDetailList() {
    this.imageDetailList = this.firebase.list('imageDetails');
  }

  insertImageDetails(imageDetails) {
    this.imageDetailList.push(imageDetails);
  }

  listar() {
    return this.afs.collection<Promocion>('promociones').valueChanges();
  }

  // Metodo recuperar los datos de la coleccion de Perfil, iterando por el id que devuelve 
  recuperarDatos(): Observable<Promocion[]>{
    return this.afs
      .collection('promociones')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a =>{
          const data = a.payload.doc.data() as Promocion;
          const id = a.payload.doc.id;
          return {id, ...data}; //SPREAD OPERATOR
        }))
      );
  }

  public eliminarPromo(promo: Promocion){
    return this.promocionCollection.doc(promo.id).delete();
  }

  public editarPromo(promo: Promocion, nuevaImagen?: FileI){

    if(nuevaImagen){
      this.obternerImagen(promo, nuevaImagen);
    }else{
      return this.promocionCollection.doc(promo.id).update(promo);
    }
  }

  subirRestauranteconPromocion(promo: Promocion, image?: FileI): void{
    this.obternerImagen(promo, image);
  }

  subirPromo(promo: Promocion, image?: FileP): void{
    this.obternerImagen2(promo, image);
  }

  private obternerImagen(promo: Promocion ,image?: FileI){
    this.filePath = `imagenesPromo/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
     .pipe(
       finalize(() => {
        fileRef.getDownloadURL().subscribe(urlImage => {
           this.UrlImagen = urlImage;
          console.log('urlImagen', this.UrlImagen);
           this.guardarPromo(promo);          
         });
      })
     ).subscribe();     
 }

 private obternerImagen2(promo: Promocion ,image?: FileP){
  this.filePath = `imagenesPromo/${image.name}`;
  const fileRef = this.storage.ref(this.filePath);
  const task = this.storage.upload(this.filePath, image);
  task.snapshotChanges()
   .pipe(
     finalize(() => {
      fileRef.getDownloadURL().subscribe(urlImage => {
         this.UrlImagen2 = urlImage;
        console.log('urlImagen', this.UrlImagen);
         this.guardarPromo2(promo);          
       });
    })
   ).subscribe();     
}

 private guardarPromo(promo: Promocion) {
  //this.idRes =perfil.id;
  let idExiste = promo.id;
  if(idExiste){
    const promoObj = {
      //id: perfil.id,
      userUID: this.usuarioLogeado,
      fotosPromocion: this.UrlImagen,
      fileRef: this.filePath
    };
    return this.promocionCollection.doc(promo.id).update(promoObj);      
  }else{
    console.log("Estoy creando un restaurante");
    let idPromo = this.afs.createId();
    promo.id = idPromo; 
    this.afs.collection('promociones').doc(idPromo).set({
      id: promo.id,
      userUID: this.usuarioLogeado,
      fotosPromocion: this.UrlImagen,
      fileRef: this.filePath
    });
  }
 }

 private guardarPromo2(promo: Promocion) {
  //this.idRes =perfil.id;
  let idExiste = promo.id;
  if(idExiste){
    const promoObj = {
      //id: perfil.id,
      userUID: this.usuarioLogeado,
      fotosPromocion: this.UrlImagen2,
      fileRef: this.filePath
    };
    return this.promocionCollection.doc(promo.id).update(promoObj);      
  }else{
    console.log("Estoy creando un restaurante");
    let idPromo = this.afs.createId();
    promo.id = idPromo; 
    this.afs.collection('promociones').doc(idPromo).set({
      id: promo.id,
      userUID: this.usuarioLogeado,
      fotosPromocion: this.UrlImagen2,
      fileRef: this.filePath
    });
  }
 }




}


