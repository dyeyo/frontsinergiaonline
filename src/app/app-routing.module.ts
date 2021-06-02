import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTerceroComponent } from './components/create-tercero/create-tercero.component';
import { TercerosComponent } from './components/terceros/terceros.component';
import { UpdateTerceroComponent } from './components/update-tercero/update-tercero.component';

const routes: Routes = [
  { path: '', component: TercerosComponent, data: { titulo: 'Home' } },
  { path: 'crear', component: CreateTerceroComponent, data: { titulo: 'Crear tercero' } },
  { path: 'editar/:id', component: UpdateTerceroComponent, data: { titulo: 'Editar tercero' } },
  { path: '**', component: TercerosComponent, data: { titulo: 'Home' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
