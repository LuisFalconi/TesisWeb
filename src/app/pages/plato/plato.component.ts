import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { PlatoService } from '../../_service/plato.service';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { Plato } from '../../_model/plato';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FunctionService } from '../../_service/function.service';

@Component({
  selector: 'app-plato',
  templateUrl: './plato.component.html',
  styleUrls: ['./plato.component.css']
})
export class PlatoComponent implements OnInit, OnDestroy {

  dataSource: MatTableDataSource<Plato>;
  displayedColumns = ['nombre', 'precio', 'tipo','acciones']; // Datos que se va amostrar en la tabla

  // Se crear la variable para liberar recursos
  private ngUnsubscribe: Subject<void> = new Subject();

  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true}) sort: MatSort;
  constructor(private platoService: PlatoService, private snackBar: MatSnackBar, private functionService: FunctionService) {

  }

  ngOnInit() {

    // Esto permite traer la data del cloud service
    this.functionService.probar().then( data =>{
      console.log(data);
    });


    // Programacion reactiva:s
    this.platoService.listar().pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
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

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
