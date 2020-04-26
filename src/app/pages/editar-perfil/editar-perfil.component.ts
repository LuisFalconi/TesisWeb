import { ModalEditRestautanteComponent } from './../../modal/modal-edit-restautante/modal-edit-restautante.component';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { Perfil } from '../../_model/perfil';
import { Subject } from 'rxjs';
import { PerfilService } from '../../_service/perfil.service';
import { takeUntil } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { stripSummaryForJitFileSuffix } from '@angular/compiler/src/aot/util';
import { analytics } from 'firebase';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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
              private afa: AngularFireAuth,
              private router: Router,
              public dialog: MatDialog) { }

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
    Swal.fire({
      title: 'Deseas eliminar tu restaurante?',
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "No!",
      confirmButtonText: 'Si!'
    }).then((result) => {
      if (result.value) {
        this.perfilService.eliminar(perfil).then(() =>{
          //this.timer();
          //window.location.reload(true);
          Swal.fire('Eliminado!','Tu Restaurante ha sido eliminado','success')
            .then(() =>{
              this.router.navigate(['/perfil']);
            });
          }).catch((error =>{
            Swal.fire('Error!', error ,'error');
          }));
      }else {
        Swal.fire("Cancelado", "Tu restaurante esta a salvo :)", "error");
    }
    })
  }

  editarRestaurante(perfil: Perfil) {
    console.log('Edit posta', perfil);
    this.openEditDialgo(perfil);
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  openEditDialgo(perfil?: Perfil): void {
    const config ={
      data:{
        contenido: perfil,
        panelClass: 'myapp-no-padding-dialog'
      }
    };
    const dialogRef = this.dialog.open(ModalEditRestautanteComponent, config);
    dialogRef.afterClosed().subscribe(resultado => {
      console.log(`Dialog result ${resultado}`);
    });
  }
}
