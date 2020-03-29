import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../_service/login.service';

@Component({
  selector: 'app-not403',
  templateUrl: './not403.component.html',
  styleUrls: ['./not403.component.css']
})
export class Not403Component implements OnInit {

  usuario: string;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.user.subscribe(data =>{
      this.usuario = data.email;
    })
  }

}
