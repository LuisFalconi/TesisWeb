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
  loginuserNolog: Perfil;
  newData: Perfil[];


  estadoEdicion: false;
  idPerfil: string;
  perfil: any[];
  n: number;
  empList: Array<{nombre: 'prueba', apellido: 'prueba2'}> = [];

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
        //this.dataSource = new MatTableDataSource(data);
        
        data.forEach((x: Perfil) =>{
          //console.log([x]);
          //console.log("Tabla Perfil " + this.loginuserlog);
            if(this.usuarioLog == x.userUID){
              console.log("Si");    
              this.loginuserlog = [x];
              this.dataSource = new MatTableDataSource(this.loginuserlog);
              console.log("Login user despues de comparar: ", this.loginuserlog);
            }else{
              console.log("No");
              console.log(x.userUID);
              this.dataSource = new MatTableDataSource(this.loginuserlog);
            } 
            
            
        //console.log("Login user despues del if: ", this.loginuserlog);
            
        });  
        //console.log("Login user despues del foreach: ", this.loginuserlog);
        //console.log("empList", this.empList);
        //data.push(this.loginuserNolog);
        //console.log("data pueba ", data);
        
        

        //this.dataSource = new MatTableDataSource(this.loginuserlog);
        console.log("Datos: ", data);
        
        

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
