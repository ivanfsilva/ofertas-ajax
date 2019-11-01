package br.com.ivanfsilva.ofertasajax.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.ivanfsilva.ofertasajax.domain.Promocao;

public interface PromocaoRepository extends JpaRepository<Promocao, Long> {

}
