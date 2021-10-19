import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBase } from 'src/app/core/classes/form-base';
import { ContaDTO } from 'src/app/core/dtos/conta.dto';
import { ContaService } from 'src/app/core/services/conta.service';
import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';
import { ValidatorsCustom } from 'src/app/shared/utils/validators-custom';

@Component({
  selector: 'app-conta-cadastrar-editar',
  templateUrl: './conta-cadastrar-editar.component.html',
  styleUrls: ['./conta-cadastrar-editar.component.scss']
})
export class ContaCadastrarEditarComponent extends FormBase implements OnInit {

  pageId: number;
  nameScreen = '';

  constructor(
    private formBuilder: FormBuilder,
    public activatedRoute: ActivatedRoute,
    private contaService: ContaService,
    public router: Router,
  ) {
    super();
  }

  ngOnInit() {
    this.getParamsScreen();
    this.validateMensageError();
    this.createFormGoup();
    this.isEditPage();
  }

  getParamsScreen() {
    const pageId = this.activatedRoute.snapshot.params.id;
    if (pageId) {
      this.pageId = Number(pageId);
      this.nameScreen = 'Editar';
    } else {
      this.nameScreen = 'Adicionar';
    }
  }

  isEditPage() {
    if (this.pageId) {
      this.getById();
    }
  }

  createFormGoup() {
    this.form = this.formBuilder.group({
      agencia: new FormControl('', [Validators.required]),
      numero: new FormControl('', [Validators.required]),
      saldo: new FormControl(0, [Validators.required, ValidatorsCustom.lessThanOne]),
      nomeCliente: new FormControl('', [Validators.required]),
      cpfCliente: new FormControl('', [Validators.required, ValidatorsCustom.validCpf]),
      emailCliente: new FormControl('', [Validators.required, ValidatorsCustom.validEmail]),
      observacoesCliente: new FormControl(''),
    });
  }

  validateMensageError() {
    this.createValidateFieldMessage({
      agencia: {
        required: 'Agência obrigatória.'
      },
      numero: {
        required: 'Número obrigatório.'
      },
      saldo: {
        required: 'Saldo obrigatório.',
        lessThanOne: 'Valor informado deve ser maior que zero.'
      },
      nomeCliente: {
        required: 'Nome obrigatório.'
      },
      cpfCliente: {
        required: 'Cpf obrigatório.',
        validCpf: 'CPF inválido.'
      },
      emailCliente: {
        required: 'Email obrigatório.',
        validEmail: 'Email inválido.'
      }
    });
  }

  getById() {
    this.contaService.getById(this.pageId).subscribe(
      (response) => {
        this.form.patchValue({
          agencia: response.agencia,
          numero: response.numero,
          saldo: response.saldo,
          nomeCliente: response.cliente.nome,
          cpfCliente: response.cliente.cpf,
          emailCliente: response.cliente.email,
          observacoesCliente: response.cliente.observacoes,
        });
      }
    );
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.pageId) {
        this.update();
      } else {
        this.create();
      }
    }
  }

  private create() {
    const entity = this.formToContaDTO();
    this.contaService.create(entity).subscribe(
      () => {
        SweetalertCustom.showAlertTimer('Operação realizada com sucesso.', { type: 'success' }).then(() => {
          this.router.navigate(['/conta']);
        });
      }
    );
  }

  private update() {
    const entity = this.formToContaDTO();
    entity.id = this.pageId as any;
    this.contaService.update(entity).subscribe(
      () => {
        SweetalertCustom.showAlertTimer('Operação realizada com sucesso.', { type: 'success' }).then(() => {
          this.router.navigate(['/conta']);
        });
      }
    );
  }

  formToContaDTO(): ContaDTO {
    const formValue = this.form.value;
    const entity = new ContaDTO({
      agencia: formValue.agencia,
      numero: formValue.numero,
      saldo: formValue.saldo,
      cliente: {
        id: 1,
        nome: formValue.nomeCliente,
        cpf: formValue.cpfCliente,
        email: formValue.emailCliente,
        observacoes: formValue.observacoesCliente,
        ativo: false,
      }
    });
    return entity;
  }

}
