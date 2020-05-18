import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Promocion } from '../../../_model/promocion';
import { PromocionService } from '../../../_service/promocion.service';
import { AngularFireAuth } from '@angular/fire/auth';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Perfil } from '../../../_model/perfil';

@Component({
  selector: 'app-lista-promociones',
  templateUrl: './lista-promociones.component.html',
  styleUrls: ['./lista-promociones.component.css']
})
export class ListaPromocionesComponent implements OnInit {

  promociones$: Observable<Promocion[]>;
  usuarioLog: string;

  constructor(private promocionSvs: PromocionService,
              private afa: AngularFireAuth,
              private router: Router) { }

  ngOnInit() {

    let currenUser = this.afa.auth.currentUser;
    this.usuarioLog = currenUser.uid

    this.promociones$ = this.promocionSvs.recuperarDatos();

  }

  eliminar(promo: Promocion){
    console.log("zzz", promo);
    
    Swal.fire({
      title: 'Deseas eliminar tu promocion?',
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "No!",
      confirmButtonText: 'Si!'
    }).then((result) => {
      if (result.value) {       
        this.promocionSvs.eliminar(promo).then(() =>{
          //this.timer();
          //window.location.reload(true);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Promocion Eliminada',
            showConfirmButton: false,
            timer: 1500
          })
            .then(() =>{
              //this.router.navigate(['/perfil']);
            });
          }).catch((error =>{
            Swal.fire('Error!', error ,'error');
          }));
      }else {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Cancelado',
          showConfirmButton: false,
          timer: 1500
        });
    }
    })
  }



}
