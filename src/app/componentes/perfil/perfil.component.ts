import { Component, OnInit } from '@angular/core';
import { OauthService } from "../../servicios/oauth.service";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  persona: any;
  constructor(private auth: OauthService) {}

  ngOnInit() {
    this.persona = this.auth.getPersona();
    console.log(this.persona.getEmail());
  }

}
