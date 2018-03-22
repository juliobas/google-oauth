import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
//Interseptors
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';

import { AppComponent } from './app.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { DriveComponent } from './componentes/drive/drive.component';
import { RutasModule } from './rutas.module';

// servicios
import { OauthService } from "./servicios/oauth.service";


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    InicioComponent,
    PerfilComponent,
    DriveComponent
  ],
  imports: [
    BrowserModule,
    RutasModule,
    HttpClientModule
  ],
  providers: [
    OauthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
