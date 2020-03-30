import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ClienteService } from '../../_service/cliente.service';
import { PlatoService } from '../../_service/plato.service';
import { Cliente } from '../../_model/cliente';
import { Plato } from '../../_model/plato';
import { Detalle } from '../../_model/detalle';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-consumo',
  templateUrl: './consumo.component.html',
  styleUrls: ['./consumo.component.css']
})
export class ConsumoComponent implements OnInit, OnDestroy {

  form: FormGroup;
  ctrlCliente: FormControl = new FormControl();
  ctrlPlato: FormControl = new FormControl();
  clientesFiltrados: Observable<any[]>;
  platosFiltrados: Observable<any[]>;
  cantidad : number;

  clientes: Cliente [] = [];
  plato: Plato [] = [];
  detalle: Detalle[] = [];

  dataSource : MatTableDataSource <Detalle>;
  displayColumns = ['nombre', 'precio', 'cantidad', 'subtotal', 'acciones'];
  total: number = 0;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  // Se crear la variable para liberar recursos
  private ngUnsubscribe: Subject<void> = new Subject();
  

  constructor(private builder: FormBuilder, private clienteService: ClienteService, private platoService: PlatoService,) { }

  ngOnInit() {
    this.form = this.builder.group({
      'cliente' : this.ctrlCliente,
      'plato' : this.ctrlPlato,
      'fecha' : new FormControl(new Date()),
      'cantidad' : new FormControl(0)   
    });

    this.listarClientes();
    this.listarPlatos();

    this.clientesFiltrados = this.ctrlCliente.valueChanges.pipe(map(val => this.filtrarClientes(val)));
    this.platosFiltrados = this.ctrlPlato.valueChanges.pipe(map(val => this.filtrarPlatos(val)));
  }

  listarClientes() {
    this.clienteService.listar().pipe(takeUntil(this.ngUnsubscribe)).subscribe(data =>{
    console.log(data);
    this.clientes = data;  
    });
  }

  listarPlatos() {
    this.platoService.listar().pipe(takeUntil(this.ngUnsubscribe)).subscribe(data =>{
    console.log(data);
    this.plato = data;  
    });
  }

  filtrarClientes(val: any) {
    if (val != null && val.cedula != null) {
      //console.log('bloque1');
      return this.clientes.filter(option =>
        option.nombreCompleto.toLowerCase().includes(val.nombreCompleto.toLowerCase()) || option.cedula.includes(val.cedula));
    } else {
      //console.log('bloque2');
      return this.clientes.filter(option =>
        option.nombreCompleto.toLowerCase().includes(val.toLowerCase()) || option.cedula.includes(val));
    }
  }

  filtrarPlatos(val: any) {
    if (val != null && val.nombre != null) {
      return this.plato.filter(option =>
        option.nombre.toLowerCase().includes(val.nombre.toLowerCase()));
    } else {
      return this.plato.filter(option =>
        option.nombre.toLowerCase().includes(val.toLowerCase()));
    }
  }

  mostrarSeleccion(val: Cliente) {
    return val ? `${val.nombreCompleto}` : val;
  }

  mostrarSeleccionPlatos(val: Plato) {
    return val ? `${val.nombre}` : val;
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
