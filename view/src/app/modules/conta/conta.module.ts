import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { CoreModule } from 'src/app/core/core.module';
import { ContaService } from 'src/app/core/services/conta.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContaRoutingModule } from './conta-routing.module';
import { ContaCadastrarEditarComponent } from './pages/conta-cadastrar-editar/conta-cadastrar-editar.component';
import { ContaListarComponent } from './pages/conta-listar/conta-listar.component';
import { ContaComponent } from './pages/conta.component';
import { ContaDepositarComponent } from './pages/conta-depositar/conta-depositar.component';
import { ContaSacarComponent } from './pages/conta-sacar/conta-sacar.component';
import { ContaTransferirComponent } from './pages/conta-transferir/conta-transferir.component';
import { ContaConsultarClienteComponent } from './pages/conta-consultar-cliente/conta-consultar-cliente.component';

@NgModule({
  declarations: [
    ContaComponent,
    ContaListarComponent,
    ContaCadastrarEditarComponent,
    ContaDepositarComponent,
    ContaSacarComponent,
    ContaTransferirComponent,
    ContaConsultarClienteComponent,
  ],
  imports: [
    CommonModule,
    ContaRoutingModule,
    SharedModule.forRoot(),
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    ContaService,
  ]
})
export class ContaModule { }
