import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../_service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  usuario: string;
  clave: string;
  constructor(private LoginService: LoginService, private route: Router) { }

  ngOnInit() {
  }

  crearUsuario() {
    this.LoginService.registrarUsuario(this.usuario, this.clave).then( () =>{
      this.route.navigate(['login']);
      console.log("Usuario Creado con exito");
  });

  }
}
