import { Component, OnInit, Input } from '@angular/core';
import { Plato } from '../../_model/plato';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlatoService } from '../../_service/plato.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-menus',
  templateUrl: './edit-menus.component.html',
  styleUrls: ['./edit-menus.component.css']
})
export class EditMenusComponent implements OnInit {

  private imagen: any;
  private imagenOriginal: any;

  // Lo que nos va pasar el modal
  @Input() menu: Plato;
  constructor(private platoSvc: PlatoService ) { }

  public editMenuForm = new FormGroup({
    id: new FormControl (''),
    platoDesayuno: new FormControl ('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),  
    detalleDesayuno: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
    precioDesayuno: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern(/^[1-9]/)]),
    entradaAlmuerzo: new FormControl('',  [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
    jugoAlmuerzo: new FormControl('',  [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
    segundoAlmuerzo: new FormControl('',  [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
    precioAlmuerzo: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern(/^[1-9]/)]),
    imagenPlato: new FormControl('')
  });

  ngOnInit() {
    this.imagen = this.menu.imgPlato;
    this.imagenOriginal = this.menu.imgPlato;
    this.iniciarForm();
  }

  editMenu(menu: Plato){

    if(this.editMenuForm.invalid){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al editar el Menú!',
      }); 
    }else{
      if(this.imagen === this.imagenOriginal){
        menu.imgPlato = this.imagenOriginal;
        console.log("No se cambio nada");
        this.platoSvc.editarMenu(menu);
        Swal.fire({
          icon: 'success',
          showConfirmButton: false,
          text: 'Menú editado!',
        });
      }else{
        console.log("Se cambio la imagen");
        this.platoSvc.editarMenu(menu, this.imagen); 
        Swal.fire({
          icon: 'success',
          showConfirmButton: false,
          text: 'Menú editado!',
        });
      }
    }    
  }

  cancelar(event: any){
    Swal.fire({
      icon: 'error',
      showConfirmButton: false,
      text: 'Menú no editado!',
    });
  }

  seleccionar(event: any): void{
    this.imagen = event.target.files[0];
  }

  // Metodo que va recibir lo que tenga en el form @input = menu
  private iniciarForm():void{
    this.editMenuForm.patchValue({
      id: this.menu.id,
      platoDesayuno: this.menu.platoDesayuno, 
      detalleDesayuno: this.menu.detalleDesayuno,
      precioDesayuno: this.menu.precioDesayuno,
      entradaAlmuerzo: this.menu.entradaAlmuerzo,
      jugoAlmuerzo: this.menu.jugoAlmuerzo,
      segundoAlmuerzo:this.menu.segundoAlmuerzo,
      precioAlmuerzo:this.menu.precioAlmuerzo,
      //imagenPlato: this.menu.imgPlato,
    });
  } 

}
