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
  constructor(private auth: OauthService) { }

  ngOnInit() {
    this.getFiles();
  }

  getFiles():void{
    this.auth.getFiles().subscribe(drive => this.drive = drive);
  }
  
  isValidFolder(mimeType): boolean{
       
    if (mimeType !== "application/vnd.google-apps.folder") {
      return true;
    }
    else{
      return false;
    }
  }
  downloadFile(id): void{
    this.auth.downloadFile(id).subscribe(drive => this.file = drive);
    window.open(this.file.alternateLink);

  }

  download(file):void{
    window.open(file.alternateLink);
  }

}

