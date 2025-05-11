package tn.esprit.finance.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.finance.entity.Budget;
import tn.esprit.finance.repository.BudgetRepository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BudgetService {
    private final BudgetRepository budgetRepository;

    public Budget createBudget(Budget budget) {
        return budgetRepository.save(budget);
    }
    @Transactional
    public Budget updateBudget(Long id, Budget updatedBudget) {
        return budgetRepository.findById(id).map(existingBudget -> {
            // Vérifier que le montant total reste valide
            if (updatedBudget.getMontantTotal() != null && updatedBudget.getMontantTotal().compareTo(BigDecimal.ZERO) > 0) {
                existingBudget.setMontantTotal(updatedBudget.getMontantTotal());
            }

            // Vérifier que le montant restant est cohérent
            if (updatedBudget.getMontantRestant() != null && updatedBudget.getMontantRestant().compareTo(existingBudget.getMontantTotal()) <= 0) {
                existingBudget.setMontantRestant(updatedBudget.getMontantRestant());
            } else {
                throw new IllegalArgumentException("Le montant restant ne peut pas être supérieur au montant total.");
            }

            // Mise à jour du projet s'il est fourni
            if (updatedBudget.getProjet() != null) {
                existingBudget.setProjet(updatedBudget.getProjet());
            }

            return budgetRepository.save(existingBudget);
        }).orElseThrow(() -> new RuntimeException("Budget non trouvé avec l'ID : " + id));
    }

    public Optional<Budget> getBudgetById(Long id) {
        return budgetRepository.findById(id);
    }

    public List<Budget> getAllBudgets() {
        return budgetRepository.findAll();
    }

//    public Budget updateBudget(Long id, Budget updatedBudget) {
//        return budgetRepository.findById(id).map(budget -> {
//            budget.setMontantTotal(updatedBudget.getMontantTotal());
//            budget.setMontantRestant(updatedBudget.getMontantRestant());
//            return budgetRepository.save(budget);
//        }).orElseThrow(() -> new IllegalArgumentException("Budget non trouvé !"));
//    }

    public void deleteBudget(Long id) {
        budgetRepository.deleteById(id);
    }
}
