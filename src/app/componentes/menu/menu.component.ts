import { Component, OnInit } from '@angular/core';
import { OauthService } from "../../servicios/oauth.service";


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  constructor(private oauth: OauthService) {}
  
  ngOnInit() {
    this.oauth.CargarCliente();
  }
  
  login(){
    this.oauth.login();
  }
  salir(){
    this.oauth.logout();
  }
  esAutenticado(): boolean{
    return this.oauth.esAutenticado();
  }
    
}
