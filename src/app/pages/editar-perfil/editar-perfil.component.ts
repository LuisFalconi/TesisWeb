import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { Perfil } from '../../_model/perfil';
import { Subject } from 'rxjs';
import { PerfilService } from '../../_service/perfil.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit, OnDestroy {

  dataSource: MatTableDataSource<Perfil>;
  displayedColumns = ['nombreR', 'fotoR' ,'tipoR', 'direccionR', 'horarioR', 'capacidadR', 'acciones'];

  private ngUnsubscribe: Subject<void> = new Subject();// Se crear la variable para liberar recursos

  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true}) sort: MatSort;

  constructor(private perfilService: PerfilService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {

    // Programacion reactiva:s
    this.perfilService.listar().pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  eliminar(perfil: Perfil){
    this.perfilService.eliminar(perfil).then(() =>{
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
