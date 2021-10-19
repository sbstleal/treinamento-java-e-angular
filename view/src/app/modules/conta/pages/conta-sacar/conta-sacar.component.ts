import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBase } from 'src/app/core/classes/form-base';
import { SaqueDTO } from 'src/app/core/dtos/saque.dto';
import { ContaService } from 'src/app/core/services/conta.service';
import { SweetalertCustom } from 'src/app/shared/utils/sweetalert-custom';
import { ValidatorsCustom } from 'src/app/shared/utils/validators-custom';

@Component({
  selector: 'app-conta-sacar',
  templateUrl: './conta-sacar.component.html',
  styleUrls: ['./conta-sacar.component.scss']
})
export class ContaSacarComponent extends FormBase implements OnInit {

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
      agencia             : new FormControl('', [Validators.required]),
      numeroConta         : new FormControl('', [Validators.required]),
      valor               : new FormControl(0, [Validators.required, ValidatorsCustom.lessThanOne]),
    });
  }

  validateMensageError() {
    this.createValidateFieldMessage({
      agencia: {
        required: 'Agência obrigatória.'
      },
      numeroConta: {
        required: 'Número obrigatório.'
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
    const entity = this.formToSaqueDTO();
    this.contaService.saque(entity).subscribe(
      () => {
        SweetalertCustom.showAlertTimer('Operação realizada com sucesso.', {type: 'success'}).then(() => {
          this.form.reset();
        });
      }
    );
  }

  formToSaqueDTO(): SaqueDTO {
    const formValue = this.form.value;
    const entity = new SaqueDTO({
      agencia       : formValue.agencia,
      numeroConta   : formValue.numeroConta,
      valor         : formValue.valor,
    });
    return entity;
  }

}
