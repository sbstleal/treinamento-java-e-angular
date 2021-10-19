import { AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { isNullOrUndefined } from 'util';

export class ValidatorsCustom {

  static noWhitespaceValidator(control: AbstractControl) {
    let field = control.value;
    if (!field) { return { required: true }; }
    field = field.toString().trim();
    if (!field) { return { required: true }; }
    return null;
  }

  /**
   * Verifica se o CPF é valido
   * @param control Campo a ser validado
   */
  static validCpf(control: AbstractControl) {

    let cpf = control.value;
    if (!cpf) { return null; }
    cpf = cpf.toString().trim();
    if (!cpf) { return null; }

    let soma = 0;
    let resto;

    if (
      cpf === '00000000000' ||
      cpf === '11111111111' ||
      cpf === '22222222222' ||
      cpf === '33333333333' ||
      cpf === '44444444444' ||
      cpf === '55555555555' ||
      cpf === '66666666666' ||
      cpf === '77777777777' ||
      cpf === '88888888888' ||
      cpf === '99999999999') {
      return { validCpf: true };
    }

    for (let i = 1; i <= 9; i++) {
      soma = soma + Number(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) {
      resto = 0;
    }

    if (resto !== Number(cpf.substring(9, 10))) {
      return { validCpf: true };
    }

    soma = 0;

    for (let i = 1; i <= 10; i++) {
      soma = soma + Number(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) {
      resto = 0;
    }

    if (resto !== Number(cpf.substring(10, 11))) {
      return { validCpf: true };
    }

    return null;
  }

  /**
   * Valida se o campo tem o número maximo informado
   * @param length Tamanho a ser utilizado na validação
   */
  static maxLength(length: number): ValidatorFn {

    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const valueControl: string = control.value.trim();

      if (valueControl && valueControl.length > length) { return { maxLength: true }; }

      return null;
    };
  }

  /**
   * Valida se o campo tem o número minimo informado
   * @param length Tamanho a ser utilizado na validação
   */
  static minLength(length: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!isNullOrUndefined(control.value) && !isNaN(control.value)) {
        const valueControl = control.value.toString().trim();
        if (valueControl && valueControl.length < length) {
          return { minLength: true };
        }
      }
      return null;
    };
  }

  /**
   * Verifica se o e-mail é valido
   * @param control Campo a ser validado
   */
  static validEmail(control: AbstractControl) {
    const email = control.value.trim();

    // tslint:disable-next-line: max-line-length
    const regexP = /[a-zA-Z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/g;

    if (email && !regexP.test(email)) {
      return { validEmail: true };
    }
    return null;
  }

  /**
   * Verifica se a senha é valida
   * @param control Campo a ser validado
   */
  static validatePasswordValid(control: AbstractControl) {
    const password = control.value.trim();
    const regexP = /^(?=\D*\d)(?=[^a-zA-Z]*[a-zA-Z]).{6,30}$/g;

    if (password && !regexP.test(password)) {
      return { passwordInvalid: true };
    }
    return null;
  }

  /**
   * Verifica se o array está vazio
   * @param control Campo a ser validado
   */
  static arrayLength(control: AbstractControl) {
    const array: any[] = control.value;
    if (array && array.length <= 0) { return { arrayEmpty: true }; }

    return null;
  }

  /**
   * Valida se a senha é igual da de confirmar senha
   * @param form Campo a ser validado
   */
  static validatePassword(form: FormGroup) {
    const novaSenha = form.get('novaSenha').value;
    const novaSenhaRepeat = form.get('novaSenhaRepeat').value;

    if (!novaSenhaRepeat || !novaSenha) {
      return null;
    }

    if (novaSenha.trim() !== novaSenhaRepeat.trim()) {
      form.get('novaSenha').setErrors({ passwordNotMatch: true });
      form.get('novaSenhaRepeat').setErrors({ passwordNotMatch: true });
      return null;
    }

    form.get('novaSenha').setErrors({ passwordNotMatch: null });
    form.get('novaSenhaRepeat').setErrors({ passwordNotMatch: null });
    form.get('novaSenha').updateValueAndValidity({ onlySelf: true });
    form.get('novaSenhaRepeat').updateValueAndValidity({ onlySelf: true });

    return null;
  }

  /**
   * Verifica se a data é inválida
   * @param control Campo a ser validado
   */
  static validDate(control: AbstractControl) {
    if (control.value) {
      if (!moment(control.value).isValid()) {
        return { validDate: true };
      }
    }

    return null;
  }

  /**
   * Verifica se é a data minima
   * @param control Campo a ser validado
   */
  static minDate(control: AbstractControl) {
    if (control.value) {
      const date = new Date(control.value);
      if (moment(date).isValid() && date.getFullYear() < (new Date(0).getFullYear() - 69)) {
        return { minDate: true };
      }
    }

    return null;
  }

  /**
   * Verifica se a data é superior a data atual
   * @param control Campo a ser validado
   */
  static higherDate(control: AbstractControl) {
    const currentDate = new Date();
    const date = new Date(control.value);

    if (moment(date).isValid() && currentDate < date) {
      return { higherDate: true };
    }

    return null;
  }

  /**
   * Valida o número do telefone/celular
   * @param control Campo a ser validado
   */
  static validPhone(control: AbstractControl) {
    const phone: string = control.value.trim();
    if (phone && (phone.length < 10 || phone.length > 11)) {
      return { phoneInvalid: true };
    }

    return null;
  }

  static lessThanOne(control: AbstractControl) {
    const value = Number(control.value);
    if (value < 1) {
      return { lessThanOne: true };
    } else {
      return null;
    }
  }

}
