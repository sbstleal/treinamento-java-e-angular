package com.indracompany.treinamento.model.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class OperacaoContaDTO {
	
	@JsonFormat(pattern="dd-MM-yyyy HH:mm:ss")
	private LocalDateTime dataHora;
	private char tpOperacao;
	private double valor;
	private String observacao;

}
