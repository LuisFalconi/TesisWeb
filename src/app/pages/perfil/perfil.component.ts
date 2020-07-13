import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../_model/usuario';
import { AngularFireAuth } from '@angular/fire/auth';
import { Perfil } from '../../_model/perfil';
import { PerfilService } from '../../_service/perfil.service';
import { LoginService } from '../../_service/login.service';
import { PlatoService } from '../../_service/plato.service';
import { MatDialog } from '@angular/material';
import { ModalComponent } from '../../modal/modal/modal.component';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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
  emailVerificado: boolean;
  fotoSocial: string;

  perfil : Perfil[];
  restaurantelog : Perfil[];

  usuarioLog: string;

  valor: boolean=true;

  perfil$: Observable<Perfil[]>;



  
  constructor(private afa: AngularFireAuth, private perfilService: PerfilService,
              private loginService: LoginService,
              private platoService: PlatoService,
              private dialog: MatDialog,
              private route: Router) { }

  ngOnInit() {
    let currenUser = this.afa.auth.currentUser;
    this.usuario = currenUser.phoneNumber;
    this.usuarioLog = currenUser.uid;

    // variable para validar si el correo del usuaro 
    this.emailVerificado = currenUser.emailVerified;





    //this.ultimaConexion = currenUser.metadata.lastSignInTime;
    //this.desde = currenUser.metadata.creationTime;
    this.usuarioSocial = currenUser.displayName;
    this.fotoSocial = currenUser.photoURL;
    
    // Programacion reactiva: Me permite mostrar los datos de la tabla del usuario logueado para que el pueda editar
    this.perfilService.listar().subscribe(data => {
      for(let x of data){
        if(this.usuarioLog == x.userUID){
          this.restaurantelog = [x];
          this.valor = true;
          this.validacion(this.valor);
          console.log("Existe informacion del restaurante", this.validacion(this.valor));
          console.log("Este restaurante", this.restaurantelog); 
          break;   
        }else{
          this.valor = false;
          console.log("No exite informacion del restaurante", this.validacion(this.valor));
        } 
      }
  });
   
    this.perfilService.listar().subscribe(data=>{
      this.perfil = data;
      //console.log(this.perfil);
      
    });

    this.perfil$ = this.perfilService.recuperarDatos();
  
  }

  // Metodo para validar si existe informacion del restaurante
  // y mostrar la opcion para cargar promociones
  validacion(valor: boolean){
      if (valor){
        return true;
      }else{
        return false;
      }
    }


  enviarEmail(){
    this.route.navigate(['/verificacionE']);
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
