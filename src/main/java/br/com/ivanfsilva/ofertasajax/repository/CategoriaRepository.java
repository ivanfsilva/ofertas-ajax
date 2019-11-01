package br.com.ivanfsilva.ofertasajax.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.ivanfsilva.ofertasajax.domain.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

}
