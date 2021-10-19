import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBase } from 'src/app/core/classes/form-base';
import { TransferenciaDTO } from 'src/app/core/dtos/transferencia.dto';
import { ContaService } from 'src/app/core/services/conta.service';
import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';
import { ValidatorsCustom } from 'src/app/shared/utils/validators-custom';

@Component({
  selector: 'app-conta-transferir',
  templateUrl: './conta-transferir.component.html',
  styleUrls: ['./conta-transferir.component.scss']
})
export class ContaTransferirComponent extends FormBase implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    public activatedRoute: ActivatedRoute,
    private contaService: ContaService,
    public router: Router,
  ) {
    super();
   }

  ngOnInit(): void {
    this.createFormGoup();
    this.validateMensageError(); 
  }

  createFormGoup() {
    this.form = this.formBuilder.group({
      agenciaDestino      : new FormControl('', [Validators.required]),
      agenciaOrigem       : new FormControl('', [Validators.required]),
      numeroContaDestino  : new FormControl('', [Validators.required]),
      numeroContaOrigem   : new FormControl('', [Validators.required]),
      valor               : new FormControl(0, [Validators.required, ValidatorsCustom.lessThanOne]),
    });
  }

  validateMensageError() {
    this.createValidateFieldMessage({
      agenciaDestino: {
        required: 'Agência de destino obrigatória.'
      },
      agenciaOrigem: {
        required: 'Agência de origem obrigatória.'
      },
      numeroContaDestino: {
        required: 'Número da conta de destino obrigatória.'
      },
      numeroContaOrigem: {
        required: 'Número da conta de origem obrigatória.'
      },
      valor: {
        required: 'Valor obrigatório.',
        lessThanOne: 'Valor informado deve ser maior que zero.'
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.create();
    }
  }

  private create() {
    const entity = this.formToTransferenciaDTO();
    this.contaService.transferencia(entity).subscribe(
      () => {
        SweetalertCustom.showAlertTimer('Operação realizada com sucesso.', {type: 'success'}).then(() => {
          this.form.reset();
        });
      }
    );
  }

  formToTransferenciaDTO(): TransferenciaDTO {
    const formValue = this.form.value;
    const entity = new TransferenciaDTO({
      agenciaDestino  : formValue.agenciaDestino,
      agenciaOrigem   : formValue.agenciaOrigem,
      numeroContaDestino  : formValue.numeroContaDestino,
      numeroContaOrigem   : formValue.numeroContaOrigem,
      valor           : formValue.valor,
    });
    return entity;
  }

}
