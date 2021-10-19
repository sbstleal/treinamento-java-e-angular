import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContaDTO } from 'src/app/core/dtos/conta.dto';
import { ContaService } from 'src/app/core/services/conta.service';
import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';

@Component({
  selector: 'app-conta-listar',
  templateUrl: './conta-listar.component.html',
  styleUrls: ['./conta-listar.component.scss']
})
export class ContaListarComponent implements OnInit {

  contas = new Array<ContaDTO>();

  constructor(
    public router: Router,
    private contaService: ContaService
  ) {}

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.contaService.getAll().subscribe(
      (response) => {
        this.contas = response;
      }
    );
  }

  update(id: number) {
    this.router.navigate(['/conta/editar', id]);
  }

  delete(id: number) {
    SweetalertCustom.showAlertConfirmAndCancel('Deseja excluir?', {type: 'warning'}).then((response) => {
      if (response.value) {
        this.contaService.delete(id).subscribe(() => {
          SweetalertCustom.showAlertTimer('Operação realizada com sucesso.', {type: 'success'}).then(() => {
            this.getAll();
          });
        });
      }
    });
  }

}
