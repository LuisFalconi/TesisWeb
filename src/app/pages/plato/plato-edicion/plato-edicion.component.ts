import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PlatoService } from '../../../_service/plato.service';
import { Plato } from 'src/app/_model/plato';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LoginService } from '../../../_service/login.service';
import { Usuario } from '../../../_model/usuario';

@Component({
  selector: 'app-plato-edicion',
  templateUrl: './plato-edicion.component.html',
  styleUrls: ['./plato-edicion.component.css']
})
export class PlatoEdicionComponent implements OnInit, OnDestroy {

  form: FormGroup;
  id: string;
  edicion: boolean;
  usuarioLogeado: string;

  // variables para subir imagen
  file: any;
  labelFile: string;
  urlImage: string;

  // Se crear la variable para liberar recursos
  private ngUnsubscribe: Subject<void> = new Subject();

  constructor(private platoService: PlatoService, 
              private route: ActivatedRoute, 
              private router: Router,
              private snackBar: MatSnackBar, 
              private afStorage: AngularFireStorage, 
              private afs: AngularFirestore, 
              private loginService: LoginService) { }

  ngOnInit() {

    // Metodo para traer el id del usuario
    this.loginService.user.pipe(takeUntil(this.ngUnsubscribe)).subscribe(data =>{
      this.usuarioLogeado = data.uid;
      console.log("1.." +this.usuarioLogeado);

    })

    console.log("2." +this.usuarioLogeado);

    this.form = new FormGroup({

      // Setear el formulario
      // Variables que se colocan en el FormControlName del html
      'id': new FormControl(''),
      //'userUID': new FormControl(''),
      'nombre': new FormControl(''),
      'precio': new FormControl(0),
      'tipo': new FormControl('')
    });

    // Esto sirve para mostrar los datos del Grid al componente de edicion
    this.route.params.subscribe((params: Params) =>{
      this.id = params['id'];
      this.edicion = this.id != null;
      this.initForm();
    });
  }

  initForm(){
    if(this.edicion){   // Metodo para mostrar lo que esta en la tabla al grid de edicion
      this.platoService.leer(this.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe((data: Plato) => {
        this.form = new FormGroup({
        'id': new FormControl(data.id),
        'nombre': new FormControl(data.nombre),
        'precio': new FormControl(data.precio),
        'tipo': new FormControl(data.tipo)
        //'userUID': new FormControl(data.userUID)
        });
        
        // Aqui no se usa el ngUnsubscribe porque se esta conectando con FireStorage
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
    //let usuario = new Usuario();
    plato.nombre = this.form.value['nombre'];
    plato.precio = this.form.value['precio'];
    plato.tipo = this.form.value['tipo'];
    
    // Guardo el id del putooooooooooo usuario logueado
    plato.userUID = this.usuarioLogeado;
    //console.log("3." + this.usuarioLogeado);
    console.log("4." + plato.userUID);

  
    //plato.userUID = this.form.value['userUID'];
    
    // Guardar la imagen atado al ID
    if(this.edicion){
      plato.id = this.form.value['id'];
    }else{
      plato.id = this.afs.createId();
    }    

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

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
