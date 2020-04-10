import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { Plato } from '../../_model/plato';
import { PlatoService } from '../../_service/plato.service';
import { FunctionService } from '../../_service/function.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {

  dataSource: MatTableDataSource<Plato>;
  dataSource2: MatTableDataSource<Plato>;
  dataSource3: MatTableDataSource<Plato>;
  displayedColumns1 = ['platoDes', 'detalleDes' ,'precioDes','userUid']; // Datos que se va amostrar en la tabla
  displayedColumns2 = ['platoAlm', 'detalleAlm' ,'precioAlm','userUid']; // Datos que se va amostrar en la tabla
  displayedColumns3 = ['platoEsp', 'detalleEsp' ,'precioEsp','userUid'];

  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true}) sort: MatSort;

  constructor(private platoService: PlatoService) { }

  ngOnInit() {

     // Programacion reactiva:s
     this.platoService.listar().subscribe(data => {

          this.dataSource = new MatTableDataSource(data);
          this.dataSource2 = new MatTableDataSource(data);
          this.dataSource3 = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource2.paginator = this.paginator;
          this.dataSource3.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.dataSource2.sort = this.sort;
          this.dataSource3.sort = this.sort;
    });
  }

}
