import { Component, OnInit } from '@angular/core';
import { ValidacionService } from 'src/app/_service/validacion.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Validacion } from '../../_model/validacion';

@Component({
  selector: 'app-validacion',
  templateUrl: './validacion.component.html',
  styleUrls: ['./validacion.component.css']
})
export class ValidacionComponent implements OnInit {

  file_val: any = null;
  labelFile: string;
  filesName: File[];
  imgSrc: string;
  isSubmitted: boolean = false;
  
  constructor(private validacionService: ValidacionService) { }

  public newValForm = new FormGroup({
    id: new FormControl (''),
    imagePost: new FormControl('', Validators.required)
  });

  ngOnInit() {
    this.resetForm();
  }

  addDocumento(data: Validacion) {
    console.log('Nueva validacion', data);
    this.validacionService.subirRestauranteconValidacion(data, this.file_val);
    console.log("Datos", data);
    this.resetForm();
    
    //this.router.navigate(['editar']);
  }

  seleccionar_doc(e: any): void{
    console.log("documento");
    
    this.isSubmitted = true;
    console.log(this.isSubmitted);
    this.file_val = e.target.files[0];
    this.labelFile = e.target.files[0].name;    
  }

  resetForm() {
    this.newValForm.reset();
    this.newValForm.setValue({
      id: '',
      imagePost: ''
    });
    this.file_val = null;
    this.labelFile = "";
    console.log("Documento Agregada");
    this.isSubmitted = false;
  }

}
