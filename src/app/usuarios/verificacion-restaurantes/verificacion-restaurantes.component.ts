import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { UsuarioService } from '../../_service/usuario.service';
import { ValidacionService } from 'src/app/_service/validacion.service';
import { Observable } from 'rxjs';
import { Validacion } from 'src/app/_model/validacion';
import { Usuario } from '../../_model/usuario';
import { PerfilService } from '../../_service/perfil.service';
import { Perfil } from '../../_model/perfil';

@Component({
  selector: 'app-verificacion-restaurantes',
  templateUrl: './verificacion-restaurantes.component.html',
  styleUrls: ['./verificacion-restaurantes.component.css']
})
export class VerificacionRestaurantesComponent implements OnInit{

  documentosR: Observable<Validacion[]>;

  users: Usuario[];
  doc: Validacion[];
  perfil: Perfil[];

  panelOpenState = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private usuarioSvc: UsuarioService,
              private validacionSvC: ValidacionService,
              private perfilSvc: PerfilService) { }

  ngOnInit() {
    this.documentosR = this.validacionSvC.recuperarDatos();

    this.usuarioSvc.listar().subscribe(usuarios =>{
      this.users=usuarios;
    });

    this.validacionSvC.listar().subscribe(doc =>{
      this.doc = doc;
    });

    this.perfilSvc.listar().subscribe(perfil => {
      this.perfil = perfil;
    })

  }

}
