import { Component, OnInit } from '@angular/core';

import { OauthService } from "../../servicios/oauth.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private oauth:OauthService) {
    oauth.CargarCliente();
  }

  ngOnInit() {
  }

  login(){
    this.oauth.login();
  }

  salir(){
    this.oauth.logout();
  }

  islogin(){
    return this.oauth.autenticado();
  }

}
