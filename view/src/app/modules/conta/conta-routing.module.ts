import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContaCadastrarEditarComponent } from './pages/conta-cadastrar-editar/conta-cadastrar-editar.component';
import { ContaDepositarComponent } from './pages/conta-depositar/conta-depositar.component';
import { ContaSacarComponent } from './pages/conta-sacar/conta-sacar.component';
import { ContaTransferirComponent } from './pages/conta-transferir/conta-transferir.component';
import { ContaListarComponent } from './pages/conta-listar/conta-listar.component';
import { ContaComponent } from './pages/conta.component';
import { ContaConsultarClienteComponent } from './pages/conta-consultar-cliente/conta-consultar-cliente.component';

const routes: Routes = [
  {
    path: '',
    component: ContaComponent,
    children: [
      {
        path: '',
        component: ContaListarComponent
      },
      {
        path: 'cadastrar',
        component: ContaCadastrarEditarComponent
      },
      {
        path: 'depositar',
        component: ContaDepositarComponent
      },
      {
        path: 'sacar',
        component: ContaSacarComponent
      },
      {
        path: 'transferir',
        component: ContaTransferirComponent
      },
      {
        path: 'consultar-cliente',
        component: ContaConsultarClienteComponent
      },
      {
        path: 'editar/:id',
        component: ContaCadastrarEditarComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContaRoutingModule { }
