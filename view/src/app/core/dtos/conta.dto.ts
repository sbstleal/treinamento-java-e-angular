import { ClienteDTO } from './cliente.dto';

export class ContaDTO {

  id: number;
  agencia: string;
  numero: string;
  saldo: number;
  cliente: ClienteDTO;

  constructor(obj?) {
    if (obj) {
      this.id = obj.id;
      this.agencia = obj.agencia;
      this.numero = obj.numero;
      this.saldo = obj.saldo;
      this.cliente = new ClienteDTO(obj.cliente);
    }
  }
}
