import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Usuario } from '../_model/usuario';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { Observable, EMPTY, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //Variable para validar el estado del usuario
  user: Observable<Usuario>;

  // Se crear la variable para liberar recursos
  //private ngUnsubscribe: Subject<void> = new Subject();

  constructor(private afa: AngularFireAuth, private afs: AngularFirestore, private route: Router) {
    // authState: Devolver el estado si alguein acaba de iniciar sesion
    this.user = this.afa.authState.pipe(
      switchMap( user => {
        if(user){
          return this.afs.doc<Usuario>(`usuarios/${user.uid}`).valueChanges();
        }else {
          return EMPTY;
        }
      })
    )
   }

  // Login con correo
  login(usuario: string, clave: string){
    return this.afa.auth.signInWithEmailAndPassword(usuario, clave).then(res =>{
      console.log(res);
      this.actualizarUsuarioData(res.user);
    })
  }

  // Login con facebook
  loginFacebook() {
    const provider = new auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  // Login con google
  loginGoogle() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }


  restablecerClave(email: string){
    return this.afa.auth.sendPasswordResetEmail(email);
  }

  registrarUsuario(usuario: string, clave: string) {
    return this.afa.auth.createUserWithEmailAndPassword(usuario, clave);
  }

  // Mecanismo que trabaja firebase ppara autentificar con redes sociales 
  private oAuthLogin(provider: any) {
    return this.afa.auth.signInWithPopup(provider).then( credencial => {
      console.log(credencial);
      this.actualizarUsuarioData(credencial.user);
    });
  }

  // Funcion para actualizar los usuarios en la base de datos de Firebase
  private actualizarUsuarioData(usuario: any) {
    const userRef: AngularFirestoreDocument<Usuario> = this.afs.doc(`usuarios/${usuario.uid}`);
    // Validacion que permite validar si un usuario ya es Admin en firebase

    // Utilizaos una variable para liberar recurson ya que estemetedo esta realizando un proceso despues de subcribirse
    let observable = userRef.valueChanges().subscribe(data => {
      // Condicion que sirve para validar si un usuario ya existente retorne el rol correspondiente
      if (data) {
        const datos: Usuario = {
          uid: usuario.uid,
          email: usuario.email,
          roles: data.roles
        }
        return userRef.set(datos); // Esta insertando datos, por ellos se crear la variable para liberar recursos al final
      } else {
        const datos: Usuario = {
          uid: usuario.uid,
          email: usuario.email,
          roles: ['dueño']
        }
        return userRef.set(datos);
      }
    });
    observable.unsubscribe; // libero recursos despues del bloque de insersion 
  }

  cerrarSesion(){
    return this.afa.auth.signOut().then( ()=> {
      window.location.reload() // Esto permite recargar la pagina al cerrar sesion, y asi simular que se esta liberando recursos
      this.route.navigate(['inicio']);
    });
  }

  estaLogeado(){
    return this.afa.auth.currentUser != null;
  }

  noEstaLogeado(){
    return this.afa.auth.currentUser == null;
  }


} 
