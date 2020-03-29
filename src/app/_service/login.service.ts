import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Usuario } from '../_model/usuario';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private afa: AngularFireAuth, private afs: AngularFirestore, private route: Router) { }

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

    userRef.valueChanges().subscribe(data => {
        const datos: Usuario = {
          uid: usuario.uid,
          email: usuario.email,
          roles: ['USER']
        }
        return userRef.set(datos);
    });
  }

  cerrarSesion(){
    return this.afa.auth.signOut().then( ()=> {
      this.route.navigate(['login']);
    });
  }

} 
