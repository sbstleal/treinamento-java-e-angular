import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContaDTO } from '../dtos/conta.dto';
import { DepositoDTO } from '../dtos/deposito.dto';
import { SaqueDTO } from '../dtos/saque.dto';
import { TransferenciaDTO } from '../dtos/transferencia.dto';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  private controller = 'contas';

  constructor(private apiService: ApiService) { }

  getAll(): Observable<ContaDTO[]> {
    return this.apiService.get(`${this.controller}/`).pipe(map(response => response.body.map(item => new ContaDTO(item))));
  }

  getById(id: number): Observable<ContaDTO> {
    return this.apiService.get(`${this.controller}/${id}/`).pipe(map(response => new ContaDTO(response.body)));
  }

  getByCpf(cpf: string): Observable<ContaDTO[]> {
    return this.apiService.get(`${this.controller}/consultar-contas-cliente/${cpf}/`).pipe(map(response => response.body.map(item => new ContaDTO(item))));
  }

  create(obj: ContaDTO): Observable<any> {
    return this.apiService.post(`${this.controller}/`, obj);
  }

  deposito(obj: DepositoDTO): Observable<any> {
    return this.apiService.post(`${this.controller}/depositar`, obj);
  }

  saque(obj: SaqueDTO): Observable<any> {
    return this.apiService.post(`${this.controller}/sacar`, obj);
  }

  transferencia(obj: TransferenciaDTO): Observable<any> {
    return this.apiService.post(`${this.controller}/transferencia`, obj);
  }

  update(obj: ContaDTO): Observable<any> {
    return this.apiService.put(`${this.controller}/${obj.id}/`, obj);
  }

  delete(id: number): Observable<any> {
    return this.apiService.delete(`${this.controller}/${id}/`);
  }
}
