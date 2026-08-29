package com.group6.loanmanagement.service;

import com.group6.loanmanagement.dto.LoanRequest;
import com.group6.loanmanagement.dto.LoanResponse;
import com.group6.loanmanagement.entity.Customer;
import com.group6.loanmanagement.entity.Loan;
import com.group6.loanmanagement.entity.LoanStatus;
import com.group6.loanmanagement.repository.LoanRepository;
import com.group6.loanmanagement.repository.CustomerRepository;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class LoanService {

    private final LoanRepository loanRepository;
    private final CustomerRepository customerRepository;

    public LoanService(LoanRepository loanRepository, CustomerRepository customerRepository) {
        this.loanRepository = loanRepository;
        this.customerRepository = customerRepository;
    }

    @Transactional(readOnly = true)
    public List<LoanResponse> getAllLoans() {
        return loanRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public LoanResponse getLoanById(UUID id) {
        return toResponse(findLoan(id));
    }

    @Transactional(readOnly = true)
    public List<LoanResponse> getLoansByCustomer(UUID customerId) {
        return loanRepository.findByCustomerId(customerId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public LoanResponse createLoan(LoanRequest request) {

        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Customer not found"));

        Loan loan = new Loan();

        loan.setCustomerId(customer.getId());
        loan.setAmount(request.getAmount());
        loan.setTermMonths(request.getTermMonths());
        loan.setStatus(LoanStatus.PENDING);

        return toResponse(loanRepository.save(loan));
    }

    @Transactional
    public LoanResponse approveLoan(UUID id) {

        return updatePendingLoanStatus(id, LoanStatus.APPROVED);
    }

    @Transactional
    public LoanResponse rejectLoan(UUID id) {

        return updatePendingLoanStatus(id, LoanStatus.REJECTED);
    }

    private LoanResponse updatePendingLoanStatus(UUID id, LoanStatus status) {

        Loan loan = findLoan(id);

        if (loan.getStatus() != LoanStatus.PENDING) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Only pending loans can be " + status.name().toLowerCase());
        }

        loan.setStatus(status);

        return toResponse(loanRepository.save(loan));
    }

    @Transactional
    public void deleteLoan(UUID id) {

        Loan loan = findLoan(id);

        loanRepository.delete(loan);
    }

    private Loan findLoan(UUID id) {

        return loanRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Loan not found"));
    }

    private LoanResponse toResponse(Loan loan) {

        return new LoanResponse(
                loan.getId(),
                loan.getCustomerId(),
                loan.getAmount(),
                loan.getTermMonths(),
                loan.getStatus(),
                loan.getCreatedAt()
        );
    }
}
