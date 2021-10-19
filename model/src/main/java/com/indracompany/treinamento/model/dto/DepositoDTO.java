package com.indracompany.treinamento.model.dto;

import java.io.Serializable;

import lombok.Data;

@Data
public class DepositoDTO implements Serializable{

	private static final long serialVersionUID = 3143005952249042118L;
	
	private String agencia;
	private String numeroConta;
	private double valor;
	
}
