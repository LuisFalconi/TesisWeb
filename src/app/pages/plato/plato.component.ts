import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { PlatoService } from '../../_service/plato.service';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { Plato } from '../../_model/plato';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FunctionService } from '../../_service/function.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-plato',
  templateUrl: './plato.component.html',
  styleUrls: ['./plato.component.css']
})
export class PlatoComponent implements OnInit, OnDestroy {

  dataSource: MatTableDataSource<Plato>;
  displayedColumns = ['nombre', 'ID' ,'precio', 'tipo', 'userUid', 'acciones']; // Datos que se va amostrar en la tabla

  usuarioLog: string;// Validar usuario logueado

  private ngUnsubscribe: Subject<void> = new Subject();// Se crear la variable para liberar recursos

  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true}) sort: MatSort;
  constructor(private platoService: PlatoService, private snackBar: MatSnackBar, private functionService: FunctionService,
              private afa: AngularFireAuth) {

  }

  ngOnInit() {

    // Esto permite traer la data del cloud service
    this.functionService.probar().then( data =>{
      console.log(data);
    });

    let currenUser = this.afa.auth.currentUser;
    this.usuarioLog = currenUser.uid;

    // Programacion reactiva:s
    this.platoService.listar().pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log("Data:" + this.displayedColumns);
    });
  }

  eliminar(plato: Plato){
    this.platoService.eliminar(plato).then(() =>{
      this.snackBar.open('Se Elimino', 'AVISO', {
        duration: 3000
      });
    });
  }

  mostrarUsuerLog():Boolean{
    if(this.usuarioLog == 'BoJ4UPCPHvSHot2Eb415Y5Wlz0a2'){
      return true;
    } else{
      return false;
    }

  }


  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
