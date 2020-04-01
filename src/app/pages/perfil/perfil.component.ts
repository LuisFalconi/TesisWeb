import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../_model/usuario';
import { AngularFireAuth } from '@angular/fire/auth';
import { Perfil } from '../../_model/perfil';
import { PerfilService } from '../../_service/perfil.service';
import { LoginService } from '../../_service/login.service';

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

  perfil : Perfil[];

  
  constructor(private afa: AngularFireAuth, private perfilService: PerfilService,
              private loginService: LoginService) { }

  ngOnInit() {
    let currenUser = this.afa.auth.currentUser;
    this.usuario = currenUser.email;
    //this.ultimaConexion = currenUser.metadata.lastSignInTime;
    //this.desde = currenUser.metadata.creationTime;
    this.usuarioSocial = currenUser.displayName;
    this.fotoSocial = currenUser.photoURL;

    this.perfilService.listar().subscribe(data =>{
      console.log(data);
      this.perfil = data;
    });

  }
}
