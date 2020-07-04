import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../_service/login.service';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { MenuService } from '../_service/menu.service';
import { Menu } from '../_model/menu';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  usuario: string;
  clave: string;
  nombre: string;
  numero: string;
  hide = true;

  // Validar cajas activas
  estadoLogin: boolean = true;
  estadoRecuperar: boolean;
  estadoCrear: boolean;

  // Se crear la variable para liberar recursos
  private ngUnsubscribe: Subject<void> = new Subject();

  constructor(private LoginService: LoginService,
              private route : Router,
              private menuService: MenuService,
              private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer) { 

    this.iconRegistry.addSvgIcon('facebook-up', this.sanitizer.bypassSecurityTrustResourceUrl("assets/facebook.svg"));
    this.iconRegistry.addSvgIcon('google-up', this.sanitizer.bypassSecurityTrustResourceUrl("assets/google.svg"));
    this.iconRegistry.addSvgIcon('food-up', this.sanitizer.bypassSecurityTrustResourceUrl("assets/food.svg"));
    this.iconRegistry.addSvgIcon('iniciar-up', this.sanitizer.bypassSecurityTrustResourceUrl("assets/chef.svg"));
    this.iconRegistry.addSvgIcon('cuenta-up', this.sanitizer.bypassSecurityTrustResourceUrl("assets/r3.svg"));
   
  }

  ngOnInit() {

  }

  login(){
    // Al momento de iniciar sesion se redirige al component "Plato"
    this.LoginService.login(this.usuario, this.clave).then( () =>{
      this.route.navigate(['infoPerfil']);
    });
  }

  get password() {return this.clave};

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
    }).catch(err => console.log("Error??", err));
  }

  restablecerClave(){
    this.LoginService.restablecerClave(this.usuario).then( data =>{
      console.log(data);
    });  
  }
  crearUsuario() {
    this.LoginService.registrarUsuario(this.usuario, this.clave, this.nombre, this.numero).then( login =>{
      this.route.navigate(['infoPerfil']);
    }).catch(err => console.log(err));
    //window.location.reload();
    //this.irLogin();
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
    // .pipe(takeUntil(this.ngUnsubscribe)): Vas hacer esto hasta que el subscribe sea necesaria para librerar recursos
    this.menuService.listar().pipe(takeUntil(this.ngUnsubscribe)).subscribe(menus => {

      this.LoginService.user.pipe(takeUntil(this.ngUnsubscribe)).subscribe(userData => {
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
            this.route.navigate(['infoPerfil']);
          }
        }
      });
    });
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
