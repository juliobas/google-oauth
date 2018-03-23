import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as _ from "lodash";

declare const gapi: any;

@Injectable()
export class OauthService {

  private static TOKEN_SESSION: string = 'tokenAcceso';
    
  constructor(private http:HttpClient) { }

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
        scope: 'profile https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file'
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

  //Metodo que obtiene el token de autenticacion
  public getToken(): string {
    let token: string = sessionStorage.getItem(OauthService.TOKEN_SESSION);
    if (!token) {
        throw new Error("Tocker no encontrado , Se Requiere autenticacion");
    }
    return sessionStorage.getItem(OauthService.TOKEN_SESSION);
  }

  //Metodo para obtener los archivos de gogole drive
  getFiles(): Observable<any>{
    const q="?q=trashed=false and 'root' in parents";
    const url = 'https://www.googleapis.com/drive/v2/files' + q;
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json --compressed'
      })
    };

    return this.http.get(url)
      .pipe(
        tap(drive => console.log(`Archivos obtenidos`)),
        catchError(this.handleError('getFiles', []))
      );
  }

  //Metodo para descar archivos de gogole drive
  //Aun no funciona correctamente
  downloadFile(id:string): Observable<any>{
    const q="?alt=media";
    const url = 'https://www.googleapis.com/drive/v2/files/' + id + q;
    
    return this.http.get(url)
      .pipe(
        tap(drive => console.log(`Archivos obtenidos`)),
        catchError(this.handleError('getFiles', []))
      );
  }

  /**
 * metodo para gestion de errores.
 * Permite que la app continue.
 * @param operation - nombre de la operacion que falla
 * @param result - valor opcional para retornar como result
 */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
     
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
