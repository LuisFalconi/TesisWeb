import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Perfil } from '../../_model/perfil';
import { PerfilService } from '../../_service/perfil.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  perfil$: Observable<Perfil[]>;  // Se utiliza $ para diferenciar que es un obserbable 


  constructor(private perfilService: PerfilService, private route: ActivatedRoute) { }

  dataSource: MatTableDataSource<Perfil>;
  displayedColumns = ['nombreR', 'fotoR' ,'tipoR', 'direccionR', 'horarioR', 'capacidadR'];
  perfil:  Perfil[];

  @ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true}) sort: MatSort;

  ngOnInit() {

    this.perfilService.listar().subscribe((data =>{
      console.log(data);
      this.perfil = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }));

    //const idPerfil = this.route.snapshot.params.id;
    //this.perfil$ = this.perfilService.recibirPerfil(idPerfil);

    // Ya no es necesario el subscribe porque en el html usamos el pipe ASYNC
    // this.perfilService.recuperarDatos().subscribe(res => console.log('Perfiles', res)); 

    this.perfil$ = this.perfilService.recuperarDatos(); // recuperamos esta data con ASYNC
  }


}
