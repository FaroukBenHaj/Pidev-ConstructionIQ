package tn.esprit.finance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.finance.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
