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
  restaurantelog : Perfil[];

  usuarioLog: string;

  valor: boolean=true;

  
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
    
    // Programacion reactiva: Me permite mostrar los datos de la tabla del usuario logueado para que el pueda editar
    this.perfilService.listar().subscribe(data => {
      for(let x of data){
        if(this.usuarioLog == x.userUID){
          console.log("Si");
          //console.log("Si");
          this.restaurantelog = [x];
          this.valor = true;
          this.validacion(this.valor);
          console.log("Validacion", this.validacion(this.valor));
          console.log("Valor:", this.valor);
          console.log("Este restaurante", this.restaurantelog); 
          break;   
        }else{
          console.log("No");
          this.valor = false;
          console.log("Valor:", this.valor);
          console.log("Validacion", this.validacion(this.valor));
        } 
      }
      // data.forEach((x: Perfil) =>{
      //     if(this.usuarioLog == x.userUID){
      //       console.log("Si");
      //       //console.log("Si");
      //       this.restaurantelog = [x];
      //       this.valor = true;
      //       console.log("Valor:", this.valor);
      //       console.log("Este restaurante", this.restaurantelog); 
      //       return;   
      //     }else{
      //       console.log("No");
      //       this.valor = false;
      //       console.log("Valor:", this.valor);
      //     }       
      // });
  });
   
    this.perfilService.listar().subscribe(data=>{
      this.perfil = data;
      //console.log(this.perfil);
      
    })
  
  }

  validacion(valor: boolean){
      if (valor){
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
