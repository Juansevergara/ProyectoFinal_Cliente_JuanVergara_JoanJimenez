import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearProductoComponent } from './Components/crear-producto/crear-producto.component';
import { ListarProductoComponent } from './Components/listar-producto/listar-producto.component';
// componentes
const routes: Routes = [
  { path: '', component : ListarProductoComponent},
  { path: 'crear-producto', component : CrearProductoComponent},
  { path: 'editar-producto/:id', component : CrearProductoComponent},
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
