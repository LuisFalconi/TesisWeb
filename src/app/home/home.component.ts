import { Component, OnInit } from '@angular/core';
import { LoginService } from '../_service/login.service';
import { LoginComponent } from '../login/login.component';
import { Usuario } from '../_model/usuario';
import { ClienteComponent } from '../pages/cliente/cliente.component';
import { PerfilService } from '../_service/perfil.service';
import { Perfil } from '../_model/perfil';

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
  constructor(public loginService: LoginService, public perfilSvc: PerfilService) { }

  ngOnInit() {
    this.loadinng = false;
    this.vista();

    this.obtenerRestaurantes();
    
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
        if(element.resVerificado ==='Aprobado' && element.estadoDocumento === 'documento Aprobado'){
          this.restaurantes.push(element);
        }
      });

      console.log("Estos res", this.restaurantes);
      
    })
  }

  // crearUsuario() {
  //   this.loginService.registrarUsuario(this.usuario, this.clave);
  //   console.log("Usuario creado con exito")
  // }

}
