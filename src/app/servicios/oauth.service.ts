import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as _ from "lodash";
declare const gapi: any;

@Injectable()
export class OauthService {

  public static TOKEN_SESSION: string = 'tokenAcceso';
  
  constructor(public router: Router) { }

  //Metodo Iniciar que carga la libreria gapi
  public CargarCliente(): void {
    gapi.load('client:auth2', this.init);

  }

  //Metodo para configuracion inicial de la libreria gapi
  private init(): void {
    gapi.client.init({
        apiKey: 'AIzaSyCxVE409lhAlfkmnctDFd1Wb-fr2ufA0hI',
        discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],
        clientId: '572404916269-npse5kiflg8f74jrr7eub9c87ptg49kj.apps.googleusercontent.com',
        scope: 'profile https://www.googleapis.com/auth/drive.file'
    }).then(()=> {

    }).then((response)=> {
            
    }, (reason)=> {
      console.log('Error: ' + reason.result.error.message);
    });

  }

  //Metodo para ingresar con la autenticacion de google
  public login(): void {
    gapi.auth2.getAuthInstance().signIn().then(()=>{
      let user = gapi.auth2.getAuthInstance().currentUser.get()
      sessionStorage.setItem(OauthService.TOKEN_SESSION, user.getAuthResponse().access_token);
      window.location.reload();
    });
  }
  
  //Metodo para salir de la autenticacion de google
  public logout(): void {
    gapi.auth2.getAuthInstance().signOut().then(()=>{
      sessionStorage.removeItem(OauthService.TOKEN_SESSION);
      window.location.reload();
    });
    
  }
  
  //Metodo Para verificar si una persona se encuentra autenticada
  public esAutenticado(): boolean {
    return !_.isEmpty(sessionStorage.getItem(OauthService.TOKEN_SESSION));
  }

  //Metodo que obtiene los datos basicos de perfil de una persona
  public getPersona(): any {
    let persona = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
    return persona;
        
  }

}
