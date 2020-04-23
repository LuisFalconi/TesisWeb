import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../_model/usuario';
import { AngularFireAuth } from '@angular/fire/auth';
import { Perfil } from '../../_model/perfil';
import { PerfilService } from '../../_service/perfil.service';
import { LoginService } from '../../_service/login.service';
import { PlatoService } from '../../_service/plato.service';
import { MatDialog } from '@angular/material';
import { ModalComponent } from '../../modal/modal/modal.component';

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

  usuarioLog: string;

  valor: number = 5;

  
  constructor(private afa: AngularFireAuth, private perfilService: PerfilService,
              private loginService: LoginService,
              private platoService: PlatoService,
              private dialog: MatDialog) { }

  ngOnInit() {
    let currenUser = this.afa.auth.currentUser;
    this.usuario = currenUser.phoneNumber;
    this.usuarioLog = currenUser.uid;

    //this.ultimaConexion = currenUser.metadata.lastSignInTime;
    //this.desde = currenUser.metadata.creationTime;
    this.usuarioSocial = currenUser.displayName;
    this.fotoSocial = currenUser.photoURL;
    


    this.perfilService.listar().subscribe(data =>{
      this.perfil = data;
      console.log("Perfil", this.perfil);
      console.log("Perfil", data);
      for (let numero of this.perfil){
        console.log(numero.userUID);
      } 
    });



  }

    perfilUsuario(){
      if (this.valor == 5){
        return true;
      }else{
        return false;
      }
    }
  
    onNewPost() {
      this.openDialog();
    }
  
    openDialog(): void {
      const dialogRef = this.dialog.open(ModalComponent, {panelClass: 'myapp-no-padding-dialog'});
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result ${result}`);
      });
    }
}
