import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PlatoService } from '../../../_service/plato.service';
import { Plato } from 'src/app/_model/plato';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-plato-edicion',
  templateUrl: './plato-edicion.component.html',
  styleUrls: ['./plato-edicion.component.css']
})
export class PlatoEdicionComponent implements OnInit {

  form: FormGroup;
  id: string;
  edicion: boolean;

  constructor(private platoService: PlatoService, private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.form = new FormGroup({
      'id': new FormControl(''),
      'nombre': new FormControl(''),
      'precio': new FormControl(0),
    });

    this.route.params.subscribe((params: Params) =>{
      this.id = params['id'];
      this.edicion = this.edicion != null;
      this.initForm();
    });
  }

  initForm(){
    if(this.edicion){
      this.platoService.leer(this.id).subscribe((data: Plato) => {
        this.form = new FormGroup({
        'id': new FormControl(data.id),
        'nombre': new FormControl(data.nombre),
        'precio': new FormControl(data.precio),
        });       
      });
    }
  }

  operar() {
    // tslint:disable-next-line:prefer-const
    let plato = new Plato();
    plato.id = this.form.value['id'];
    plato.nombre = this.form.value['nombre'];
    plato.precio = this.form.value['precio'];

    let mensaje
    if(this.edicion){
      this.platoService.modificar(plato);
      mensaje = "Plato modificado";
    } else{
      this.platoService.registrar(plato);   
      mensaje = "Plato Registrado con existo";

    }

    this.snackBar.open(mensaje, 'AVISO', {
      duration: 5000
    });
    this.router.navigate(['plato']);
  }

}
