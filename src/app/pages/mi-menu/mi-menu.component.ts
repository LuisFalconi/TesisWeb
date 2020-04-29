import { Component, OnInit } from '@angular/core';
import { Plato } from '../../_model/plato';
import { AngularFireAuth } from '@angular/fire/auth';
import { PlatoService } from '../../_service/plato.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { AddMenuModalComponent } from '../../modal/add-menu-modal/add-menu-modal.component';

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
  valor: boolean=true;
  menuLog : Plato[];
  
  plato$: Observable<Plato[]>;

  constructor(private afa:AngularFireAuth,
              private platoService: PlatoService,
              private dialog: MatDialog) { }

  ngOnInit() {
    let currenUser = this.afa.auth.currentUser;
    this.usuario = currenUser.email;
    this.usuarioLog = currenUser.uid;
    this.usuarioSocial = currenUser.displayName;
    this.fotoSocial = currenUser.photoURL;

    this.platoService.listar().subscribe(data =>{
      for(let x of data){
        if(this.usuarioLog == x.userUID){
          console.log("Si");
          //console.log("Si");
          this.menuLog = [x];
          this.valor = true;
          this.validacion(this.valor);
          console.log("Validacion", this.validacion(this.valor));
          console.log("Valor:", this.valor);
          console.log("Este restaurante", this.menuLog); 
          break;   
        }else{
          console.log("No");
          this.valor = false;
          console.log("Valor:", this.valor);
          this.validacion(this.valor);
          console.log("Validacion", this.validacion(this.valor));
        } 
      }
    });
    

    this.plato$ = this.platoService.recuperarMenus(); // recuperamos esta data con ASYNC
    

  }

  validacion(valor: boolean){
    if (valor){
      return true;
    }else{
      return false;
    }
  }

  nuevoMenu() {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddMenuModalComponent, {panelClass: 'myapp-no-padding-dialog'});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result ${result}`);
    });
  }

}
