import { Component, OnInit, Input } from '@angular/core';
import { Perfil } from 'src/app/_model/perfil';
import { PerfilService } from '../../_service/perfil.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-restaurante',
  templateUrl: './edit-restaurante.component.html',
  styleUrls: ['./edit-restaurante.component.css']
})
export class EditRestauranteComponent implements OnInit {

  private imagen: any;
  private imagenOriginal: any;

  // Lo que nos va pasar el modal
  @Input() perfil: Perfil;

  constructor(private perfilSvc: PerfilService) { }

  public editResForm = new FormGroup({
    id: new FormControl (''),
    nombreRestaurante: new FormControl ('', Validators.required),  
    tipoRestaurante: new FormControl('', Validators.required),
    capacidadRestaurante: new FormControl('', Validators.required),
    horarioRestaurante: new FormControl('', Validators.required),
    direccionRestaurante: new FormControl('', Validators.required),
    fotoRes: new FormControl('', Validators.required)
  });
  ngOnInit() {
    this.imagen = this.perfil.imagenRes;
    this.imagenOriginal = this.perfil.imagenRes;
    this.iniciarForm();
  }

  editPerfil(perfil: Perfil){
    console.log('Newimg', this.imagen);
    console.log('original', this.imagenOriginal);
    
    if(this.imagen === this.imagenOriginal){
      perfil.imagenRes = this.imagenOriginal;
      console.log("No se cambio nada");
      this.perfilSvc.editarPerfil(perfil);
    }else{
      console.log("Se cambio la imagen");
      this.perfilSvc.editarPerfil(perfil, this.imagen);

      
    }

  }

  seleccionar(event: any): void{
    this.imagen = event.target.files[0];
  }

  // Metodo que va recibir lo que tenga en el form @input = perfil
  private iniciarForm():void{
    this.editResForm.patchValue({
      id: this.perfil.id,
      nombreRestaurante: this.perfil.nombreRestaurante,
      tipoRestaurante: this.perfil.tipoRestaurante, 
      capacidadRestaurante: this.perfil.capacidadRestaurante,
      horarioRestaurante: this.perfil.horarioRestaurante,
      direccionRestaurante: this.perfil.direccionRestaurante,
      //fotoRes: this.perfil.imagenRes
    });
  } 

}
