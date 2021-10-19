export class ClienteDTO {

  id: number;
  nome: string;
  cpf: string;
  email: string;
  ativo: boolean;
  observacoes: string;

  constructor(obj?) {
    if (obj) {
      this.id = obj.id;
      this.nome = obj.nome;
      this.cpf = obj.cpf;
      this.email = obj.email;
      this.ativo = obj.ativo;
      this.observacoes = obj.observacoes;
    }
  }
}
