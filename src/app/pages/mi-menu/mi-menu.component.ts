import { Component, OnInit } from '@angular/core';
import { Plato } from '../../_model/plato';
import { AngularFireAuth } from '@angular/fire/auth';
import { PlatoService } from '../../_service/plato.service';
import { Observable } from 'rxjs';

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
  
  plato$: Observable<Plato[]>;

  constructor(private afa:AngularFireAuth, private platoService: PlatoService) { }

  ngOnInit() {
    let currenUser = this.afa.auth.currentUser;
    this.usuario = currenUser.email;
    this.usuarioLog = currenUser.uid;
    this.usuarioSocial = currenUser.displayName;
    this.fotoSocial = currenUser.photoURL;

    this.platoService.listar().subscribe(data =>{
      this.platos = data;
    });

    this.plato$ = this.platoService.recuperarMenus(); // recuperamos esta data con ASYNC
    

  }

}
