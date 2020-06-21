import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { PlatoService } from '../../_service/plato.service';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { Plato } from '../../_model/plato';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FunctionService } from '../../_service/function.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { EditMenuModalComponent } from '../../modal/edit-menu-modal/edit-menu-modal.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plato',
  templateUrl: './plato.component.html',
  styleUrls: ['./plato.component.css']
})
export class PlatoComponent implements OnInit, OnDestroy {

  dataSource: MatTableDataSource<Plato>;
  dataSource2: MatTableDataSource<Plato>;
  dataSource3: MatTableDataSource<Plato>;
  displayedColumns1 = ['platoDes', 'detalleDes' ,'precioDes', 'acciones']; // Datos que se va amostrar en la tabla
  displayedColumns2 = ['entradaAlm', 'segundoAlm' ,'jugoAlm','precioAlm','acciones']; // Datos que se va amostrar en la tabla

  usuarioLog: string;// Validar usuario logueado
  usuarioLogeado: Plato[]; // variable para guardar la coleccion de los campos de los usuarios logueados
  plato$: Observable<Plato[]>;

  private ngUnsubscribe: Subject<void> = new Subject();// Se crear la variable para liberar recursos

  // @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  // @ViewChild(MatSort, { static: true}) sort: MatSort;
  
  constructor(private platoService: PlatoService, 
              private snackBar: MatSnackBar, 
              private functionService: FunctionService,
              private afa: AngularFireAuth,
              private router: Router,
              public dialog: MatDialog) {

  }

  ngOnInit() {

    // Esto permite traer la data del cloud service
    // this.functionService.probar().then( data =>{
    //   console.log(data);
    // });

    let currenUser = this.afa.auth.currentUser;
    this.usuarioLog = currenUser.uid;

    this.plato$ = this.platoService.recuperarMenus(); // recuperamos esta data con ASYNC
    

    

    // Programacion reactiva:s
    this.platoService.listar().pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      data.forEach((menus: Plato) =>{
        if(this.usuarioLog == menus.userUID){
          console.log("Si");
          this.usuarioLogeado = [menus];
          console.log(this.usuarioLogeado);
          this.dataSource = new MatTableDataSource(this.usuarioLogeado);
          this.dataSource2 = new MatTableDataSource(this.usuarioLogeado);
          
        }else{
          console.log("No");
        } 
      });
      //this.dataSource = new MatTableDataSource(data);
      //this.dataSource2 = new MatTableDataSource(data);
      //this.dataSource3 = new MatTableDataSource(data);
    });
  }

  eliminar(plato: Plato){
    Swal.fire({
      title: 'Deseas eliminar tu menú?',
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "No!",
      confirmButtonText: 'Si!'
    }).then((result) => {
      if (result.value) {
        this.platoService.eliminar(plato).then(() =>{
          //this.timer();
          //window.location.reload(true);
          Swal.fire('Eliminado!','Tu Menú ha sido eliminado','success')
            .then(() =>{
              this.router.navigate(['/miMenu']);
            });
          }).catch((error =>{
            Swal.fire('Error!', error ,'error');
          }));
      }else {
        Swal.fire("Cancelado", "Tu menú esta a salvo :)", "error");
    }
    })
  }

  editarMenu(plato: Plato) {
    this.openEditDialgo(plato);
  }

  openEditDialgo(plato?: Plato): void {
    const config ={
      data:{
        contenido: plato,
        panelClass: 'myapp-no-padding-dialog'
      }
    };
    const dialogRef = this.dialog.open(EditMenuModalComponent, config);
    dialogRef.afterClosed().subscribe(resultado => {
      console.log(`Dialog result ${resultado}`);
    });
  }

  

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
