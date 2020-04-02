import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PerfilService } from '../../../_service/perfil.service';
import { takeUntil } from 'rxjs/operators';
import { Perfil } from 'src/app/_model/perfil';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-agregar-perfil',
  templateUrl: './agregar-perfil.component.html',
  styleUrls: ['./agregar-perfil.component.css']
})
export class AgregarPerfilComponent implements OnInit {

  form: FormGroup;
  id: string;
  edicion: boolean;
  usuarioLogeado: string;

  file: any;
  labelFile: string;
  urlImage: string;

  // Se crear la variable para liberar recursos
  private ngUnsubscribe: Subject<void> = new Subject();
  constructor(private route: ActivatedRoute,
              private perfilService: PerfilService,
              private afStorage: AngularFireStorage,
              private afs: AngularFirestore,
              private snackBar: MatSnackBar,
              private router: Router ) { }

  ngOnInit() {

    // // Metodo para traer el id del usuario
    // this.loginService.user.pipe(takeUntil(this.ngUnsubscribe)).subscribe(data =>{
    //   this.usuarioLogeado = data.uid;
    //   console.log("1.." +this.usuarioLogeado);

    // })

    this.form = new FormGroup({
      // Setear el formulario
      // Variables que se colocan en el FormControlName del html
      'id': new FormControl(''),
      'nombreR': new FormControl(''),
      'fotoR': new FormControl(''),
      'tipoR': new FormControl(''),
      'direccionR': new FormControl(''),
      'horarioR': new FormControl(''),
      'capacidadR': new FormControl('')

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
      this.perfilService.leer(this.id).pipe(takeUntil(this.ngUnsubscribe)).subscribe((data: Perfil) => {
        this.form = new FormGroup({
          'id': new FormControl(data.id),
          'nombreR': new FormControl(data.nombreRestaurante),
          'fotoR': new FormControl(data.fotoRestaurante),
          'tipoR': new FormControl(data.tipoRestaurante),
          'direccionR': new FormControl(data.direccionRestaurante),
          'horarioR': new FormControl(data.horarioRestaurate),
          'capacidadR': new FormControl(data.capacidadRestaurante),
        });
        
        // Aqui no se usa el ngUnsubscribe porque se esta conectando con FireStorage
         if(data != null){
           this.afStorage.ref(`perfiles/${data.id}`).getDownloadURL().subscribe(data => {
            this.urlImage = data;
           })
          }
      });
    }
  }

  operar() {
 
    let perfil = new Perfil();
    perfil.nombreRestaurante = this.form.value['nombreR'];
    perfil.fotoRestaurante = this.form.value['fotoR'];
    perfil.tipoRestaurante = this.form.value['tipoR'];
    perfil.horarioRestaurate = this.form.value['horarioR'];
    perfil.direccionRestaurante = this.form.value['direccionR'];
    perfil.capacidadRestaurante = this.form.value['capacidadR'];
    
    // Guardar la imagen atado al ID
    if(this.edicion){
      perfil.id = this.form.value['id'];
    }else{
      perfil.id = this.afs.createId();
    }    

    // Funcion para subir imagenes
    if(this.file != null){
      let ref = this.afStorage.ref(`perfiles/${perfil.id}`);
      ref.put(this.file);
    }
    

    let mensaje
    if(this.edicion){
      this.perfilService.modificar(perfil);
      mensaje = "Perfil modificado";
    } else{
      this.perfilService.registrar(perfil);   
      mensaje = "Perfil Registrado con existo";

    }

    this.snackBar.open(mensaje, 'AVISO', {
      duration: 5000
    });
    this.router.navigate(['editar']);
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
