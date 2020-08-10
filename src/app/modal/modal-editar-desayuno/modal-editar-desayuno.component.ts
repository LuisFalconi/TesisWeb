import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EditarDesayunoComponent } from '../../pages/platos/editar-desayuno/editar-desayuno.component';

@Component({
  selector: 'app-modal-editar-desayuno',
  templateUrl: './modal-editar-desayuno.component.html',
  styleUrls: ['./modal-editar-desayuno.component.css']
})
export class ModalEditarDesayunoComponent implements OnInit {

  constructor(public dialog: MatDialogRef<ModalEditarDesayunoComponent>,
    // tslint:disable-next-line: align
    @Inject(MAT_DIALOG_DATA) public datos: any) { }

  ngOnInit() {
  }

}
