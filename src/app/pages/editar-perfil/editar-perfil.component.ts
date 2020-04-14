import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { Perfil } from '../../_model/perfil';
import { Subject } from 'rxjs';
import { PerfilService } from '../../_service/perfil.service';
import { takeUntil } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { stripSummaryForJitFileSuffix } from '@angular/compiler/src/aot/util';
import { analytics } from 'firebase';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit, OnDestroy {

  dataSource: MatTableDataSource<Perfil>;
  displayedColumns = ['nombreR', 'fotoR' ,'tipoR', 'direccionR', 'horarioR', 'capacidadR', 'acciones'];

  private ngUnsubscribe: Subject<void> = new Subject();// Se crear la variable para liberar recursos
  usuarioLog: string;
  useremailLog: string;
  loginuser: Perfil[];
  loginuserlog: Perfil[];

  estadoEdicion: false;
  idPerfil: string;
  perfil: any[];
  n: number;

  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true}) sort: MatSort;

  constructor(private perfilService: PerfilService,
              private snackBar: MatSnackBar,
              private afa: AngularFireAuth) { }

  ngOnInit() {

    let currenUser = this.afa.auth.currentUser;
    this.usuarioLog = currenUser.uid;
    this.useremailLog = currenUser.email;

    // Programacion reactiva: Me permite mostrar los datos de la tabla del usuario logueado para que el pueda editar
    this.perfilService.listar().pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
        data.forEach((x: Perfil) =>{
            if(this.usuarioLog == x.userUID){
              console.log("Si");
              //console.log("Si");
              this.loginuserlog = [x];
              this.dataSource = new MatTableDataSource(this.loginuserlog);
            }else{
              console.log("No");
              this.dataSource = new MatTableDataSource(this.loginuserlog);
            }       
        });

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // console.log("ID Login" + this.usuarioLog);
      //console.log("Usuario logueado : " + this.useremailLog);
      
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
