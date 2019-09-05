import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MapaComponent } from './mapa/mapa.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CarsComponent } from './cars/cars.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'mapa', component: MapaComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'cars', component: CarsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
