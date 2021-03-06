import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MapaComponent } from './mapa/mapa.component';
import { TareasComponent } from './tareas/tareas.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'mapa', component: MapaComponent },
  { path: 'tareas', component: TareasComponent },
  { path: 'usuarios', component: UsuariosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
