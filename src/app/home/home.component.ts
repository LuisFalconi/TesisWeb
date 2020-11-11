import { Component, OnInit } from '@angular/core';
import { LoginService } from '../_service/login.service';
import { LoginComponent } from '../login/login.component';
import { Usuario } from '../_model/usuario';
import { ClienteComponent } from '../pages/cliente/cliente.component';
import { PerfilService } from '../_service/perfil.service';
import { Perfil } from '../_model/perfil';
import { PromocionService } from '../_service/promocion.service';
import { Promocion } from '../_model/promocion';
import { ModalPromocionesComponent } from '../modal/modal-promociones/modal-promociones.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loadinng: boolean;
  usuario: string;
  clave: string;

  restaurantes: Perfil[] =[];
  promociones: Promocion[] =[];

  slideIndex: number =  1;


  constructor(public loginService: LoginService, public perfilSvc: PerfilService, public pomocionSvc: PromocionService,private dialog: MatDialog) { }

  ngOnInit() {
    this.loadinng = false;
    this.vista();

    this.obtenerRestaurantes();
    this.obtenerPromociones();

    this.showSlides(this.slideIndex);
  }

  vista(){

    if(this.loadinng){
      console.log("Aqui estoy")
    }else{
      console.log("ya no estoy aqui")
    }
  }

  obtenerRestaurantes(){
    this.perfilSvc.listar().subscribe(data =>{
      this.restaurantes = [];

      data.forEach(element => {
        if(element.resVerificado ==='Aprobado' && element.estadoDocumento === 'documento Aprobado' && element.estado ==='verdadero'){
          this.restaurantes.push(element);
        }
      });

      console.log("Estos res", this.restaurantes);
     
      
    })
  }

  obtenerPromociones(){
    console.log("sss", this.restaurantes);
    this.pomocionSvc.listar().subscribe(p =>{
      this.promociones = [];
      p.forEach(element => {
        if(element.estado === 'verdadero'){
          this.promociones.push(element);
        } 
      });
      console.log("pro", this.promociones);
      
    });
  }


// showSlides(slideIndex);

// Next/previous controls
plusSlides(n: number) {
  this.showSlides(this.slideIndex += n);
}

// Thumbnail image controls
currentSlide(n: number) {
  this.showSlides(this.slideIndex = n);
}

showSlides(n: number) {
  let i: number;
  let slides = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;;
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {this.slideIndex = 1}
  if (n < 1) {this.slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[this.slideIndex-1].style.display = "block";
  dots[this.slideIndex-1].className += " active";
}

openPromo(promociones: Promocion) {
  this.promoModal(promociones);
}

  promoModal(promo: Promocion ): void {
    const config ={
      data:{
        contenido: promo
      }
    };
  const dialogRef = this.dialog.open(ModalPromocionesComponent, config);
  dialogRef.afterClosed().subscribe(result => {
    // console.log(`Dialog result ${result}`);
  });
}

}
