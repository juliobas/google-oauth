import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { LoginComponent } from './componentes/login/login.component';
import { RutasModule } from './/rutas.module';

// servicios
import { OauthService } from "./servicios/oauth.service";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RutasModule
  ],
  providers: [OauthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
