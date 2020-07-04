import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { Plato } from '../../_model/plato';
import { PlatoService } from '../../_service/plato.service';
import { FunctionService } from '../../_service/function.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { PerfilService } from '../../_service/perfil.service';
import { Perfil } from '../../_model/perfil';
import { Usuario } from 'src/app/_model/usuario';
import { UsuarioService } from '../../_service/usuario.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {

  dataSource: MatTableDataSource<Plato>;
  dataSource2: MatTableDataSource<Plato>;
  dataSource3: MatTableDataSource<Plato>;
  dataSource4: MatTableDataSource<Perfil>;
  displayedColumns1 = ['platoDes', 'detalleDes' ,'precioDes','userUid']; // Datos que se va amostrar en la tabla
  displayedColumns2 = ['platoAlm', 'detalleAlm' ,'precioAlm','userUid']; // Datos que se va amostrar en la tabla
  displayedColumns3 = ['platoEsp', 'detalleEsp' ,'precioEsp','userUid'];
  displayedColumns4 = ['nombreRes']; // Datos que se va amostrar en la tabla

  perfil: Perfil[];

  restaurante: Perfil[];
  menu: Plato[];
  usuario: Usuario[];

  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true}) sort: MatSort;

  constructor(private platoService: PlatoService, 
              private PerfilService: PerfilService,
              private UsuarioSVS: UsuarioService) { }

  ngOnInit() {

     // Programacion reactiva:s
     this.platoService.listar().subscribe(data => {

          this.dataSource = new MatTableDataSource(data);
          this.dataSource2 = new MatTableDataSource(data);
          this.dataSource3 = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource2.paginator = this.paginator;
          this.dataSource3.paginator = this.paginator;
    });

    this.PerfilService.listar().subscribe(datos =>{
      this.dataSource4 = new MatTableDataSource(datos);
    })

    this.PerfilService.recuperarDatos().subscribe( data =>{
      this.restaurante = data;
    });

    this.platoService.recuperarMenus().subscribe(data =>{
      this.menu = data;
    });

    this.UsuarioSVS.recuperarDatos().subscribe(data =>{
      this.usuario = data;
    })
  }

}
