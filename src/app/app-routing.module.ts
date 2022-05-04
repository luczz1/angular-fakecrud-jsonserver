import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { DetalhesItemComponent } from './lista/detalhes-item/detalhes-item.component';
import { EditarItemComponent } from './lista/editar-item/editar-item.component';
import { ListaComponent } from './lista/lista.component';

const routes: Routes = [
  { path: 'cadastro', component: CadastroComponent },
  { path: 'lista', component: ListaComponent },
  { path: 'detalhes/:name', component: DetalhesItemComponent },
  { path: 'editar/:name', component: EditarItemComponent },
  { path: '', redirectTo: '/lista', pathMatch: 'full' },
  { path: '**', redirectTo: '/lista', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
