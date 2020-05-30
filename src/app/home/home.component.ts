import { Component, OnInit } from '@angular/core';
import { LoginService } from '../_service/login.service';
import { LoginComponent } from '../login/login.component';
import { Usuario } from '../_model/usuario';
import { ClienteComponent } from '../pages/cliente/cliente.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loadinng: boolean;
  usuario: string;
  clave: string;
  constructor(public loginService: LoginService) { }

  ngOnInit() {
    this.loadinng = false;
    this.vista();
    
  }

  vista(){

    if(this.loadinng){
      console.log("Aqui estoy")
    }else{
      console.log("ya no estoy aqui")
    }
  }

  // crearUsuario() {
  //   this.loginService.registrarUsuario(this.usuario, this.clave);
  //   console.log("Usuario creado con exito")
  // }

}
