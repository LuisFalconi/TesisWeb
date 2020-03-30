import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../_model/usuario';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario: string;
  ultimaConexion: string;
  desde: string;
  usuarioSocial: string;
  fotoSocial: string;
  
  constructor(private afa: AngularFireAuth) { }

  ngOnInit() {
    let currenUser = this.afa.auth.currentUser;
    this.usuario = currenUser.email;
    this.ultimaConexion = currenUser.metadata.lastSignInTime;
    this.desde = currenUser.metadata.creationTime;
    this.usuarioSocial = currenUser.displayName;
    this.fotoSocial = currenUser.photoURL;

  }

}
