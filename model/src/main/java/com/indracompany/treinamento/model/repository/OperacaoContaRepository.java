package com.indracompany.treinamento.model.repository;

import java.time.LocalDateTime;
import java.util.List;

import com.indracompany.treinamento.model.entity.ContaBancaria;
import com.indracompany.treinamento.model.entity.OperacaoConta;

public interface OperacaoContaRepository extends GenericCrudRepository<OperacaoConta, Long> {
	
	List<OperacaoConta> findByConta(ContaBancaria conta);

	List<OperacaoConta> findByContaAndDataHoraBetween(ContaBancaria conta, LocalDateTime dataInicial, LocalDateTime dataFinal);

}
