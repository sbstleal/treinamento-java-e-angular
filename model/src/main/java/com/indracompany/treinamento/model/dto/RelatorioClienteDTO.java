package com.indracompany.treinamento.model.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RelatorioClienteDTO {
	
	private String nome;
	private String cpf;
	private List<String> contas;
}
