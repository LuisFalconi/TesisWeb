import { Component, OnInit, ViewChild } from '@angular/core';
import { PlatoService } from '../../_service/plato.service';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { Plato } from '../../_model/plato';

@Component({
  selector: 'app-plato',
  templateUrl: './plato.component.html',
  styleUrls: ['./plato.component.css']
})
export class PlatoComponent implements OnInit {

  dataSource: MatTableDataSource<Plato>;
  displayedColumns = ['nombre', 'precio', 'acciones'];

  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true}) sort: MatSort;
  constructor(private platoService: PlatoService, private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    // Programacion reactiva:
    this.platoService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
  }

  eliminar(plato: Plato){
    this.platoService.eliminar(plato).then(() =>{
      this.snackBar.open('Se Elimino', 'AVISO', {
        duration: 3000
      });
    });
  }

}
