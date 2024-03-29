package br.com.ivanfsilva.ofertasajax.repository;

import br.com.ivanfsilva.ofertasajax.domain.Promocao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public interface PromocaoRepository extends JpaRepository<Promocao, Long> {

    @Query("select count(p.id) as count, max(p.dtCadastro) as lastDate "
            + "from Promocao p where p.dtCadastro > :data")
    Map<String, Object> totalAndUltimaPromocaoByDataCadastro(@Param("data") LocalDateTime data);

    @Query("select p.dtCadastro from Promocao p")
    Page<LocalDateTime> findUltimaDataDePromocao(Pageable pageable);

	@Query("SELECT p FROM Promocao p WHERE p.preco = :preco")
	Page<Promocao> findByPreco(@Param("preco")BigDecimal preco, Pageable pageable);

    @Query("SELECT p FROM Promocao p WHERE p.titulo LIKE %:search% " +
            "OR p.site LIKE %:search% OR " +
            "p.categoria.titulo LIKE %:search%")
    Page<Promocao> findByTituloOrSiteOrCategoria(@Param("search") String search, Pageable pageable);

    @Query("SELECT p FROM Promocao p WHERE p.site LIKE :site")
    Page<Promocao> findBySite(@Param("site") String site, Pageable pageable);

    @Query("SELECT DISTINCT p.site FROM Promocao p WHERE p.site LIKE %:site%")
    List<String> findSitesByTermo(@Param("site") String site);

    @Transactional(readOnly = false)
    @Modifying
    @Query("UPDATE Promocao p SET p.likes = p.likes + 1 WHERE p.id = :id")
    void updateSomarLikes(@Param("id") Long id);

    @Query("SELECT p.likes FROM Promocao p WHERE p.id = :id")
    int findLikesById(@Param("id") Long id);

}
