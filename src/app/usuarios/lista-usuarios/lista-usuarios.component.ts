import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { UsuarioService } from '../../_service/usuario.service';
import { Usuario } from '../../_model/usuario';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['email', 'rol', 'uid', 'acciones'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(private usuarioSvc: UsuarioService) { }

  ngOnInit() {
    this.usuarioSvc.recuperarDatos().subscribe(usuarios => (this.dataSource.data = usuarios));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applicarFiltro(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // editarRestaurante(perfil: Perfil) {
  //   console.log('Edit posta', perfil);
  //   this.dialogoNuevoRestaurante(perfil);
  // }

  eliminarUsuario(usuario: Usuario) {   
    console.log("USER: ", usuario.uid);
    this.usuarioSvc.obtenerUsuario(usuario.uid);
     
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        this.usuarioSvc.eliminarUsuario(usuario).then(() => {
          Swal.fire('Deleted!', 'Your  post has been deleted.', 'success');
        }).catch((error) => {
          Swal.fire('Error!', 'There was an error deleting this post', 'error');
        });
      }
    });
  }

}
