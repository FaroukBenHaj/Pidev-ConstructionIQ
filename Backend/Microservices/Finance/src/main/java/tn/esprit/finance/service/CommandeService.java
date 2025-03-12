package tn.esprit.finance.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.finance.entity.Commande;
import tn.esprit.finance.repository.CommandeRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommandeService {
    private final CommandeRepository commandeRepository;

    public Commande createCommande(Commande commande) {
        return commandeRepository.save(commande);
    }

    public Optional<Commande> getCommandeById(Long id) {
        return commandeRepository.findById(id);
    }

    public List<Commande> getAllCommandes() {
        return commandeRepository.findAll();
    }

    public Commande updateCommande(Long id, Commande updatedCommande) {
        return commandeRepository.findById(id).map(existingCommande -> {
            existingCommande.setStatus(updatedCommande.getStatus());
            existingCommande.setMontant(updatedCommande.getMontant());
            existingCommande.setDateCommande(updatedCommande.getDateCommande());
            return commandeRepository.save(existingCommande);
        }).orElseThrow(() -> new IllegalArgumentException("Commande non trouvée !"));
    }

    public void deleteCommande(Long id) {
        commandeRepository.deleteById(id);
    }
}
