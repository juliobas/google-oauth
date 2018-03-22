import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './componentes/inicio/inicio.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { DriveComponent } from './componentes/drive/drive.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'documentos', component: DriveComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class RutasModule {}
