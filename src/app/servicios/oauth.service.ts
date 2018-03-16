import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import gapi from 'gapi-client';
 /// <reference types="@types/gapi" />
//import "gapi";
//import "gapi.auth2";
declare const gapi: any;


@Injectable()
export class OauthService {

  constructor() { }

  public CargarCliente(): void {
    gapi.load('client:auth2', this.init);

  }

  private init(): void {
    gapi.client.init({
        apiKey: 'AIzaSyCxVE409lhAlfkmnctDFd1Wb-fr2ufA0hI',
        discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],
        clientId: '572404916269-npse5kiflg8f74jrr7eub9c87ptg49kj.apps.googleusercontent.com',
        scope: 'profile https://www.googleapis.com/auth/drive.file'
    }).then(function () {

      //console.log(gapi.auth2.getAuthInstance().isSignedIn.get());

    });
  }

  public login(): void {
    gapi.auth2.getAuthInstance().signIn();
  }

  public logout(): void {
    gapi.auth2.getAuthInstance().signOut();
  }

  public autenticado(): boolean {
    console.log(gapi.auth2.getAuthInstance().isSignedIn.get());
    if(gapi.auth2.getAuthInstance().isSignedIn.get())
      return false;
    else
      return true;
  }

}
