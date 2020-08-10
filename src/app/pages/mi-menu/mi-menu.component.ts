import { PlatoDesayuno } from './../../_model/platoDesayuno';
import { Component, OnInit } from '@angular/core';
import { Plato } from '../../_model/plato';
import { AngularFireAuth } from '@angular/fire/auth';
import { PlatoService } from '../../_service/plato.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { AddMenuModalComponent } from '../../modal/add-menu-modal/add-menu-modal.component';
import { PerfilService } from '../../_service/perfil.service';
import { Perfil } from '../../_model/perfil';
import { ValidacionService } from 'src/app/_service/validacion.service';
import { Usuario } from '../../_model/usuario';
import { ModalDesayunoComponent } from '../../modal/modal-desayuno/modal-desayuno.component';
import { PlatoDesayunoService } from '../../_service/plato-desayuno.service';

@Component({
  selector: 'app-mi-menu',
  templateUrl: './mi-menu.component.html',
  styleUrls: ['./mi-menu.component.css']
})
export class MiMenuComponent implements OnInit {

  usuario: string;
  usuarioSocial: string;
  fotoSocial: string;

  platos : Plato[];
  usuarioLog: string;
  menuLog : Plato[];
  restaurantelog : Perfil[];

  valor: boolean=true;
  valorRestaurante: boolean=true;
  validacionR: boolean=true;

  
  plato$: Observable<Plato[]>;
  platoDes$: Observable<PlatoDesayuno[]>;
  perfil$: Observable<Perfil[]>;

  constructor(private afa:AngularFireAuth,
              private platoService: PlatoService,
              private desayunoService: PlatoDesayunoService,
              private dialog: MatDialog,
              private perfilService: PerfilService,
              private validacionService: ValidacionService) { }

  ngOnInit() {
    let currenUser = this.afa.auth.currentUser;
    this.usuario = currenUser.email;
    this.usuarioLog = currenUser.uid;
    this.usuarioSocial = currenUser.displayName;
    this.fotoSocial = currenUser.photoURL;

    this.platoService.listar().subscribe(data =>{
      for(let x of data){
        if(this.usuarioLog == x.userUID){
          //console.log("Si");
          //console.log("Si");
          this.menuLog = [x];
          this.valor = true;
          this.validacion(this.valor);
          //console.log("Validacion", this.validacion(this.valor));
          //console.log("Valor:", this.valor);
          //console.log("Este restaurante", this.menuLog); 
          break;   
        }else{
          //console.log("No");
          this.valor = false;
          //console.log("Valor:", this.valor);
          this.validacion(this.valor);
          //console.log("Validacion", this.validacion(this.valor));
        } 
      }
    });

    // Esto funciona para verificar si un restaurant tiene un documento subido
    this.validacionService.listar().subscribe(data => {
      console.log(data);
      for(let x of data){
        if(this.usuarioLog == x.userUID){
          console.log("Si existe documento");
          console.log(x.docValidacion);
          //this.restaurantelog = [x];
          this.validacionR = true;
          this.validacionDocRestauranteExiste(this.validacionR);
          //console.log("Este restaurante", this.restaurantelog); 
          break;   
        }else{
          console.log("No existe documento");
          console.log(x.userUID);
          
          this.validacionR = false;
          this.validacionDocRestauranteExiste(this.validacionR);
        } 
      }
  });

  
    
    this.perfilService.listar().subscribe(data => {
      for(let x of data){
        if(this.usuarioLog == x.userUID){
          console.log("Si");
          //console.log("Si");
          this.restaurantelog = [x];
          this.valorRestaurante = true;
          this.validacionRestauranteExiste(this.valorRestaurante);
          //console.log("Este restaurante", this.restaurantelog); 
          break;   
        }else{
          console.log("No");
          this.valorRestaurante = false;
          this.validacionRestauranteExiste(this.valorRestaurante);
        } 
      }
  });



  this.plato$ = this.platoService.recuperarMenus(); // recuperamos esta data con ASYNC
  this.platoDes$ = this.desayunoService.recuperarMenus(); // recuperamos esta data con ASYNC
  this.perfil$ = this.perfilService.recuperarDatos(); // recuperamos esta data con ASYNC
    

  }

  validacion(valor: boolean){
    if (valor){
      return true;
    }else{
      return false;
    }
  }

  validacionRestauranteExiste(valor: boolean){
    if (valor){
      return true;
    }else{
      return false;
    }
  }

  // Validacion si el documento que valide el nuevo restaurante existe
  validacionDocRestauranteExiste(valor: boolean){
    if (valor){
      return true;
    }else{
      return false;
    }
  }

  validacionDocumento(valor: boolean){
    if (valor){
      return true;
    }else{
      return false;
    }
  }

  nuevoMenu() {
    this.openDialog();
  }

  nuevoDesayuno() {
    this.desayunoDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddMenuModalComponent, {panelClass: 'myapp-no-padding-dialog'});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result ${result}`);
    });
  }

  desayunoDialog(): void {
    const dialogRef = this.dialog.open(ModalDesayunoComponent, {panelClass: 'myapp-no-padding-dialog'});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result ${result}`);
    });
  }

}
