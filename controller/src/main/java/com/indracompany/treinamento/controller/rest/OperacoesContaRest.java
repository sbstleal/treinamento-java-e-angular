package com.indracompany.treinamento.controller.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.indracompany.treinamento.model.dto.OperacaoContaDTO;
import com.indracompany.treinamento.model.entity.OperacaoConta;
import com.indracompany.treinamento.model.service.OperacaoContaService;

@RestController
@RequestMapping("rest/operacoes")
public class OperacoesContaRest extends GenericCrudRest<OperacaoConta, Long, OperacaoContaService> {

	@Autowired
	public OperacaoContaService operacaoContaService;

	@GetMapping(value = "/ExtratoPorContaAgencia/{agencia}/{numeroConta}", produces = {
			MediaType.APPLICATION_JSON_VALUE })

	public @ResponseBody ResponseEntity<List<OperacaoContaDTO>> obterOperacoes(@PathVariable String agencia,
			@PathVariable String numeroConta) {

		List<OperacaoContaDTO> dto = operacaoContaService.obterOperacoes(agencia, numeroConta);

		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@GetMapping(value = "/ExtratoPorContaAgenciaData/{agencia}/{numeroConta}/{dataInicial}/{dataFinal}", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<OperacaoContaDTO>> obterOperacoesData(@PathVariable String agencia, 
			@PathVariable String numeroConta, @PathVariable String dataInicial, @PathVariable String dataFinal) {

		List<OperacaoContaDTO> dto = operacaoContaService.obterOperacoesData(agencia, numeroConta, dataInicial, dataFinal);
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}

}
