import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { RutasModule } from './/rutas.module';

// servicios
import { OauthService } from "./servicios/oauth.service";


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    InicioComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    RutasModule,
  ],
  providers: [OauthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
