import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Perfil } from '../../_model/perfil';
import { PerfilService } from '../../_service/perfil.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  constructor(private perfilService: PerfilService) { }

  dataSource: MatTableDataSource<Perfil>;
  displayedColumns = ['nombreR', 'fotoR' ,'tipoR', 'direccionR', 'horarioR', 'capacidadR'];
  perfil:  Perfil[];

  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true}) sort: MatSort;

  ngOnInit() {

    this.perfilService.listar().subscribe((data =>{
      console.log(data);
      this.perfil = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }));
  }

}
