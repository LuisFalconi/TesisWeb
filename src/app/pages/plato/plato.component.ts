import { Component, OnInit } from '@angular/core';
import { PlatoService } from '../../_service/plato.service';

@Component({
  selector: 'app-plato',
  templateUrl: './plato.component.html',
  styleUrls: ['./plato.component.css']
})
export class PlatoComponent implements OnInit {

  constructor(private platoService: PlatoService) { }

  ngOnInit() {
    // Programacion reactiva:
    this.platoService.listar().subscribe(data => {
      console.log(data);
    });
  }

}
