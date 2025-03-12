package tn.esprit.finance.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.finance.entity.Budget;
import tn.esprit.finance.repository.BudgetRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BudgetService {
    private final BudgetRepository budgetRepository;

    public Budget createBudget(Budget budget) {
        return budgetRepository.save(budget);
    }

    public Optional<Budget> getBudgetById(Long id) {
        return budgetRepository.findById(id);
    }

    public List<Budget> getAllBudgets() {
        return budgetRepository.findAll();
    }

    public Budget updateBudget(Long id, Budget updatedBudget) {
        return budgetRepository.findById(id).map(budget -> {
            budget.setMontantTotal(updatedBudget.getMontantTotal());
            budget.setMontantRestant(updatedBudget.getMontantRestant());
            return budgetRepository.save(budget);
        }).orElseThrow(() -> new IllegalArgumentException("Budget non trouvé !"));
    }

    public void deleteBudget(Long id) {
        budgetRepository.deleteById(id);
    }
}
