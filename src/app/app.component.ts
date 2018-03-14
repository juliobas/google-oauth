import { Component } from '@angular/core';

import gapi from 'gapi-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  LoginGoogle(){
    gapi.load('client:auth2', this.initClient);
    console.log("google");
  }

  initClient() {
    gapi.client.init({
      discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
      clientId: '572404916269-npse5kiflg8f74jrr7eub9c87ptg49kj.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/drive.metadata.readonly'
    }).then(function (){
      console.log("Funciona");
    });  
  }
}
