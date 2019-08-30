import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MapaComponent } from './mapa/mapa.component';
import { TareasComponent } from './tareas/tareas.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SiniestrosComponent } from './siniestros/siniestros.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'mapa', component: MapaComponent },
  { path: 'tareas', component: TareasComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'siniestros', component: SiniestrosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
