package com.group6.loanmanagement.repository;

import com.group6.loanmanagement.entity.Loan;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoanRepository extends JpaRepository<Loan, UUID> {

    List<Loan> findByCustomerId(UUID customerId);

}