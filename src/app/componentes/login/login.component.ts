import { Component, OnInit } from '@angular/core';
import { gapi } from 'gapi-client';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, gapi {

  constructor() { }

  ngOnInit() {
  }

  LoginGoogle(){
    gapi.load('client:auth2', this.initClient);
    console.log("google");
  }

  initClient() {
    gapi.client.init({
      discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
      apiKey: 'AIzaSyCxVE409lhAlfkmnctDFd1Wb-fr2ufA0hI',
      clientId: '572404916269-npse5kiflg8f74jrr7eub9c87ptg49kj.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/drive.metadata.readonly'
    }).then(function (){
      console.log("Funciona");
    });  
  }

}
