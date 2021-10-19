import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBase } from 'src/app/core/classes/form-base';
import { ContaDTO } from 'src/app/core/dtos/conta.dto';
import { ContaService } from 'src/app/core/services/conta.service';

@Component({
  selector: 'app-conta-consultar-cliente',
  templateUrl: './conta-consultar-cliente.component.html',
  styleUrls: ['./conta-consultar-cliente.component.scss']
})
export class ContaConsultarClienteComponent extends FormBase implements OnInit {

  contas = new Array<ContaDTO>();

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private contaService: ContaService
  ) { 
    super();
  }

  ngOnInit(): void {
    this.createFormGoup();
    this.validateMensageError();
  }

  createFormGoup() {
    this.form = this.formBuilder.group({
      cpf             : new FormControl('', [Validators.required]),
    });
  }

  validateMensageError() {
    this.createValidateFieldMessage({
      cpf: {
        required: 'CPF obrigatório.'
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formValue = this.form.value;
      this.getByCpf(formValue.cpf);
    }
  }

  getByCpf(cpf: string) {    
    this.contaService.getByCpf(cpf).subscribe(
      (response) => {
        this.contas = response;
      }
    );
  }

  update(id: number) {
    this.router.navigate(['/conta/editar', id]);
  }

}
