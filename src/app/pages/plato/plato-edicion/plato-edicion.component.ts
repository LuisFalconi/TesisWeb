import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PlatoService } from '../../../_service/plato.service';
import { Plato } from 'src/app/_model/plato';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-plato-edicion',
  templateUrl: './plato-edicion.component.html',
  styleUrls: ['./plato-edicion.component.css']
})
export class PlatoEdicionComponent implements OnInit {

  form: FormGroup;
  id: string;
  edicion: boolean;

  // variables para subir imagen
  file: any;
  labelFile: string;
  urlImage: string;

  constructor(private platoService: PlatoService, private route: ActivatedRoute, 
    private router: Router, private snackBar: MatSnackBar, private afStorage: AngularFireStorage, 
    private afs: AngularFirestore) { }

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
        
        if(data != null){
          this.afStorage.ref(`plato/${data.id}`).getDownloadURL().subscribe(data => {
            this.urlImage = data;
          })
        }
      });
    }
  }

  operar() {
 
    let plato = new Plato();
    // Guardar la imagen atado al ID
    if(this.edicion){
      plato.id = this.form.value['id'];
    }else{
      plato.id = this.afs.createId();
    }

    plato.nombre = this.form.value['nombre'];
    plato.precio = this.form.value['precio'];

    // Funcion para subir imagenes
    if(this.file != null){
      let ref = this.afStorage.ref(`plato/${plato.id}`);
      ref.put(this.file);
    }
    

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

  // Funcion para mostrar el nombre del archivo seleccionado
  seleccionar(e: any){
    this.file = e.target.files[0];
    this.labelFile = e.target.files[0].name;
  }
}
