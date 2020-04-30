import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Promocion } from '../../../_model/promocion';
import { PromocionService } from '../../../_service/promocion.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-lista-promociones',
  templateUrl: './lista-promociones.component.html',
  styleUrls: ['./lista-promociones.component.css']
})
export class ListaPromocionesComponent implements OnInit {

  promociones$: Observable<Promocion[]>;
  usuarioLog: string;

  constructor(private promocionSvs: PromocionService,
              private afa: AngularFireAuth) { }

  ngOnInit() {

    let currenUser = this.afa.auth.currentUser;
    this.usuarioLog = currenUser.uid

    this.promociones$ = this.promocionSvs.recuperarDatos();

  }



}
