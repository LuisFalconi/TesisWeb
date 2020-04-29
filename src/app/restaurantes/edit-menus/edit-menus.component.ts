import { Component, OnInit, Input } from '@angular/core';
import { Plato } from '../../_model/plato';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlatoService } from '../../_service/plato.service';

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
    platoDesayuno: new FormControl ('', Validators.required),  
    detalleDesayuno: new FormControl('', Validators.required),
    precioDesayuno: new FormControl('', Validators.required),
    entradaAlmuerzo: new FormControl('', Validators.required),
    jugoAlmuerzo: new FormControl('', Validators.required),
    segundoAlmuerzo: new FormControl('', Validators.required),
    precioAlmuerzo: new FormControl('', Validators.required),
    imagenPlato: new FormControl('', Validators.required)
  });

  ngOnInit() {
    this.imagen = this.menu.imgPlato;
    this.imagenOriginal = this.menu.imgPlato;
    this.iniciarForm();
  }

  editMenu(menu: Plato){
    console.log('Newimg', this.imagen);
    console.log('original', this.imagenOriginal);
    
    if(this.imagen === this.imagenOriginal){
      menu.imgPlato = this.imagenOriginal;
      console.log("No se cambio nada");
      this.platoSvc.editarMenu(menu);
    }else{
      console.log("Se cambio la imagen");
      this.platoSvc.editarMenu(menu, this.imagen); 
    }
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
