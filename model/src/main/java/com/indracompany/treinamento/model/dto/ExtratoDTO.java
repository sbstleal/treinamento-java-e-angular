package com.indracompany.treinamento.model.dto;

import java.io.Serializable;
import java.time.LocalDate;

import lombok.Data;

@Data
public class ExtratoDTO implements Serializable{

	private static final long serialVersionUID = 7413604204379034157L;
	
	private String agencia;
	private String numeroConta;
	private LocalDate dtInicio;
	private LocalDate dtFim;
	
}
