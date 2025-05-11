package tn.esprit.finance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.finance.entity.Commande;

import java.util.List;

public interface CommandeRepository extends JpaRepository<Commande, Long> {
    List<Commande> findByStatus(Commande.CommandeStatus status);
}
