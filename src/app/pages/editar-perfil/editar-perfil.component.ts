import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { Perfil } from '../../_model/perfil';
import { Subject } from 'rxjs';
import { PerfilService } from '../../_service/perfil.service';
import { takeUntil } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { stripSummaryForJitFileSuffix } from '@angular/compiler/src/aot/util';

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

  estadoEdicion: boolean;
  idPerfil: string;
  perfil: Perfil[];
  n: number;

  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true}) sort: MatSort;

  constructor(private perfilService: PerfilService,
              private snackBar: MatSnackBar,
              private afa: AngularFireAuth) { }

  ngOnInit() {

    // Programacion reactiva:s
    this.perfilService.listar().pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      this.perfil = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    let currenUser = this.afa.auth.currentUser;
    this.usuarioLog = currenUser.uid;
    this.useremailLog = currenUser.email;

    
    this.estadoEditar();
    

  }

  eliminar(perfil: Perfil){
    this.perfilService.eliminar(perfil).then(() =>{
      this.snackBar.open('Se Elimino', 'AVISO', {
        duration: 3000
      });
    });
  }

  estadoEditar(){
    //console.log(this.usuarioLog);
    this.perfilService.recuperar().subscribe(data =>{
      data.forEach((x: any) =>{
        console.log(x.payload.doc.id);
        console.log(x.payload.doc().userUID);
      });
    });
          this.n = 5;
          if(this.n == 5){
            return true;
          }else{
            false;
          }
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
