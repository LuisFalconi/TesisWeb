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
  dataSource2: MatTableDataSource<Plato>;
  dataSource3: MatTableDataSource<Plato>;
  displayedColumns1 = ['platoDes', 'detalleDes' ,'precioDes','userUid', 'acciones']; // Datos que se va amostrar en la tabla
  displayedColumns2 = ['entradaAlm', 'segundoAlm' ,'jugoAlm','precioAlm','userUid', 'acciones']; // Datos que se va amostrar en la tabla
  displayedColumns3 = ['acciones']; // Datos que se va amostrar en la tabla

  usuarioLog: string;// Validar usuario logueado
  usuarioLogeado: Plato[]; // variable para guardar la coleccion de los campos de los usuarios logueados

  private ngUnsubscribe: Subject<void> = new Subject();// Se crear la variable para liberar recursos

  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true}) sort: MatSort;
  
  constructor(private platoService: PlatoService, 
              private snackBar: MatSnackBar, 
              private functionService: FunctionService,
              private afa: AngularFireAuth) {

  }

  ngOnInit() {

    // Esto permite traer la data del cloud service
    // this.functionService.probar().then( data =>{
    //   console.log(data);
    // });

    let currenUser = this.afa.auth.currentUser;
    this.usuarioLog = currenUser.uid;
    

    // Programacion reactiva:s
    this.platoService.listar().pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      data.forEach((menus: Plato) =>{
        if(this.usuarioLog == menus.userUID){
          console.log("Si");
          this.usuarioLogeado = [menus];
          console.log(this.usuarioLogeado);
          this.dataSource = new MatTableDataSource(this.usuarioLogeado);
          this.dataSource2 = new MatTableDataSource(this.usuarioLogeado);
          this.dataSource3 = new MatTableDataSource(this.usuarioLogeado);
          
        }else{
          console.log("No");
          //this.dataSource = new MatTableDataSource(this.usuarioLogeado);
          //this.dataSource2 = new MatTableDataSource(this.usuarioLogeado);
          //  this.dataSource3 = new MatTableDataSource(this.usuarioLogeado);
        } 
      });
      //this.dataSource = new MatTableDataSource(data);
      //this.dataSource2 = new MatTableDataSource(data);
      //this.dataSource3 = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource2.paginator = this.paginator;
      this.dataSource3.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource2.sort = this.sort;
      this.dataSource3.sort = this.sort;
      //console.log("Data:" + this.displayedColumns);
      //console.log("Data:" + this.displayedColumns2);
    });
  }

  eliminar(plato: Plato){
    this.platoService.eliminar(plato).then(() =>{
      this.snackBar.open('Se Elimino', 'AVISO', {
        duration: 3000
      });
    });
  }

  // mostrarUsuerLog():Boolean{
  //   if(this.usuarioLog == 'BoJ4UPCPHvSHot2Eb415Y5Wlz0a2'){
  //     return true;
  //   } else{
  //     return false;
  //   }

  // }


  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
