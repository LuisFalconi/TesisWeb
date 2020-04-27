import { Component, OnInit } from '@angular/core';
import { Promocion } from '../../_model/promocion';
import { PromocionService } from '../../_service/promocion.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FileI } from '../../_model/imagenes';
import { FileP } from '../../_model/promosImg';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.css']
})
export class PromocionesComponent implements OnInit {

  file_promo: any = null;
  labelFile: string;
  private files: FileP;
  filesName: File[];
  imgSrc: string;
  //selectedImage: any = null;
  isSubmitted: boolean = false;


  constructor(private promoService: PromocionService) { }

  public newPromoForm = new FormGroup({
    id: new FormControl (''),
    imagePost: new FormControl('', Validators.required)
  });

  public formTemplate = new FormGroup({
    caption: new FormControl('', Validators.required),
    category: new FormControl(''),
    imageUrl: new FormControl('', Validators.required)
  })

  ngOnInit() {
    this.resetForm();
  }

  addPromocion(data: Promocion) {
    console.log('Nueva Promo', data);
    this.promoService.subirRestauranteconPromocion(data, this.file_promo);
    console.log("Datos", data);
    this.resetForm();
    
    //this.router.navigate(['editar']);
  }

  seleccionar_promo(e: any): void{
    this.isSubmitted = true;
    console.log(this.isSubmitted);
    this.file_promo = e.target.files[0];
    this.labelFile = e.target.files[0].name;    
  }

  // Aun no le hago uncionar la opcion para subir varias imagenes a la vez
  public selectFiles(event: any): void {    
    if (event.target.files && event.target.files.length) {
      this.files = event.target.files;
      this.filesName = event.target.files.name;
      console.log("Imagenes seleccionadas", this.files);
      console.log("Imagenes seleccionadas", this.filesName);
      
    }
  }


  resetForm() {
    this.newPromoForm.reset();
    this.newPromoForm.setValue({
      id: '',
      imagePost: ''
    });
    this.file_promo = null;
    this.labelFile = "";
    console.log("Promocion Agregada");
    this.isSubmitted = false;
  }


}
