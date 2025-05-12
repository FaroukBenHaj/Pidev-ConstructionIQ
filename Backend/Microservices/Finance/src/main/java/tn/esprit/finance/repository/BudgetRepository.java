package tn.esprit.finance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.finance.entity.Budget;

public interface BudgetRepository extends JpaRepository<Budget, Long> {
}
