import { Component, OnInit } from '@angular/core';
import { LoginService } from '../_service/login.service';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { MenuService } from '../_service/menu.service';
import { Menu } from '../_model/menu';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: string;
  clave: string;

  // Validar cajas activas
  estadoLogin: boolean = true;
  estadoRecuperar: boolean;
  estadoCrear: boolean;

  constructor(private LoginService: LoginService, private route : Router, private menuService: MenuService) { }

  ngOnInit() {
  }

  login(){
    // Al momento de iniciar sesion se redirige al component "Plato"
    this.LoginService.login(this.usuario, this.clave).then( () =>{
      this.route.navigate(['plato']);
    });
  }

  loginFacebook() {
    this.LoginService.loginFacebook().then(() => {
      this.listarMenus();
    }).catch(err => {

      // manejo de error en caso que un usuario tenga el mismo correo con facebook y google
      if (err.code === 'auth/account-exists-with-different-credential') {
        let facebookCred = err.credential;
        let googleProvider = new auth.GoogleAuthProvider();
        googleProvider.setCustomParameters({ 'login_hint': err.email });

        return auth().signInWithPopup(googleProvider).then(result => {
          return result.user.linkWithCredential(facebookCred);
        });
      }
    });
  }

  loginGoogle() {
    this.LoginService.loginGoogle().then(() => {
      this.listarMenus();
    });
  }

  restablecerClave(){
    this.LoginService.restablecerClave(this.usuario).then( data =>{
      console.log(data);
    });  
  }
  crearUsuario() {
    this.LoginService.registrarUsuario(this.usuario, this.clave);
    this.irLogin();
  }

  irCrear() {
    this.estadoCrear = true;
    this.estadoLogin = false;
    this.estadoRecuperar = false;
  }

  irLogin() {
    this.estadoLogin = true;
    this.estadoRecuperar = false;
    this.estadoCrear = false;
  }

  irRecuperar() {
    this.estadoRecuperar = true;
    this.estadoLogin = false;
    this.estadoCrear = false;
  }

  listarMenus() {
    this.menuService.listar().subscribe(menus => {

      this.LoginService.user.subscribe(userData => {
        if (userData) {
          //console.log(userData);
          let user_roles: string[] = userData.roles
          let final_menus: Menu[] = [];

          for (let menu of menus) {
            n2: for (let rol of menu.roles) {
              for (let urol of user_roles) {
                if (rol === urol) {
                  let m = new Menu();
                  m.nombre = menu.nombre;
                  m.icono = menu.icono;
                  m.url = menu.url;
                  final_menus.push(m);
                  break n2;
                }
              }
            }

            this.menuService.menuCambio.next(final_menus);
            this.route.navigate(['plato']);
          }
        }
      });
    });
  }
}
