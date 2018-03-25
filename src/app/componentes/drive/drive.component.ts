import { Component, OnInit } from '@angular/core';
import { OauthService } from "../../servicios/oauth.service";

@Component({
  selector: 'app-drive',
  templateUrl: './drive.component.html',
  styleUrls: ['./drive.component.css']
})
export class DriveComponent implements OnInit {
  drive: any;
  file: any;
  folders: object[] = [{id:"root", title:"Inicio"}];
  
  constructor(private auth: OauthService) { }

  ngOnInit() {
    this.getFiles("");
  }

  //Metodo que obtiene los archivos de google drive mediante el servicio
  getFiles(file): void{
    if(file){
      let folder:object = {id:file.id, title:file.title};
      this.folders.push(folder);
    }
    this.auth.getFiles(file.id).subscribe(drive => this.drive = drive);
  }

  //Metodo que re ensabla el breadcrumb segun donde el usuario haya dado click
  //Luego ejecuta la funcion getFiles
  breadcrumb(folder): void{
      let foldersaux:object[] = [];
      for(let i in this.folders){
        if(this.folders[i]['id'] !== folder.id)
        {
          console.log(this.folders[i]['id']);
          foldersaux.push(this.folders[i]);
        }
        else{
          break;
        }
      }
      this.folders =[];
      this.folders = foldersaux;
      this.getFiles(folder);
   
  }
  
  //Metodo para verificar si es un archivo
  isValidFile(mimeType): boolean{
       
    if (mimeType !== "application/vnd.google-apps.folder") {
      return true;
    }
    else{
      return false;
    }
  }

  //Metodo para verificar si es una carpeta
  isValidFolder(mimeType): boolean{
       
    if (mimeType == "application/vnd.google-apps.folder") {
      return true;
    }
    else{
      return false;
    }
  }

  visualizar(file):void{
    window.open(file.alternateLink);
  }

  //No funciona falta revisar bien
  /* downloadFile(id): void{
    this.auth.downloadFile(id).subscribe(drive => this.file = drive);
    window.open(this.file.alternateLink);

  } */
}

