import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from './_service/login.service';
import { MenuService } from './_service/menu.service';
import { Menu } from './_model/menu';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  //title = 'Tesis-Web';
  // Necesitamos recuperar el cambio por lo cual se crea la variable
  menus: Menu[] = [];

  // Se crear la variable para liberar recursos
  private ngUnsubscribe: Subject<void> = new Subject();

  constructor(public loginService: LoginService, private menuService: MenuService, 
              private router: Router){

  }

  ngOnInit(){
    this.menuService.menuCambio.pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      this.menus = data;
    })
  }


  irLogin(){
    Swal.fire({
      title: 'Deseas forma parte de Muertos de Hambre?',
      //text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "No!",
      confirmButtonText: 'Si!'
    }).then((result) => {
      if (result.value) {
              this.router.navigate(['/login']);
      }else {
        Swal.fire("Cancelado", "Puedes seguir pensando :)", "error");
      }
    });
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


}
