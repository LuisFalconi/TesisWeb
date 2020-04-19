import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PerfilService } from '../../_service/perfil.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';
import { LoginService } from '../../_service/login.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Perfil } from '../../_model/perfil';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-restaurante',
  templateUrl: './crear-restaurante.component.html',
  styleUrls: ['./crear-restaurante.component.css']
})
export class CrearRestauranteComponent implements OnInit, OnDestroy {

  form: FormGroup;
  id: string;
  edicion: boolean;
  usuarioLogeado: string;
  perfil : Perfil[];

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
              private router: Router,
              private loginService: LoginService) { }

  ngOnInit() {
    // Metodo para traer el id del usuario
    this.loginService.user.pipe(takeUntil(this.ngUnsubscribe)).subscribe(data =>{
      this.usuarioLogeado = data.uid;
    })

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

    this.perfilService.listar().subscribe(data =>{
      this.perfil = data;
      console.log(this.perfil)
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

    Swal.fire({
      title: '¿Deseas crear tu restaurante?',
      //text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "No!",
      confirmButtonText: 'Si!'
    }).then((result) => {
      if (result.value) {
    
        let perfil = new Perfil();
        perfil.nombreRestaurante = this.form.value['nombreR'];
        perfil.fotoRestaurante = this.form.value['fotoR'];
        perfil.tipoRestaurante = this.form.value['tipoR'];
        perfil.horarioRestaurate = this.form.value['horarioR'];
        perfil.direccionRestaurante = this.form.value['direccionR'];
        perfil.capacidadRestaurante = this.form.value['capacidadR'];
        perfil.userUID = this.usuarioLogeado;
    
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
      //Swal.fire('Eliminado!','Tu Restaurante ha sido eliminado','success')
    } else{
      this.perfilService.registrar(perfil);   
      Swal.fire('Agregado!','Tu Restaurante ha sido agregado','success')
    }

    this.router.navigate(['editar']);
  
    }else {
        Swal.fire("Cancelado", "Puedes seguir pensando :)", "error");
      }
    })


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
