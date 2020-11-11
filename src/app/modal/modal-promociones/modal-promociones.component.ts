import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-promociones',
  templateUrl: './modal-promociones.component.html',
  styleUrls: ['./modal-promociones.component.css']
})
export class ModalPromocionesComponent implements OnInit {

  constructor(public dialog: MatDialogRef<ModalPromocionesComponent>,
    // tslint:disable-next-line: align
    @Inject(MAT_DIALOG_DATA) public datos: any) { }

  ngOnInit() {
  }

}
