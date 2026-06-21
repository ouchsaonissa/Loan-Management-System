package com.group6.loanmanagement.controller;

import com.group6.loanmanagement.dto.LoanRequest;
import com.group6.loanmanagement.dto.LoanResponse;
import com.group6.loanmanagement.service.LoanService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/loans")
public class LoanController {

    private final LoanService loanService;

    public LoanController(LoanService loanService) {
        this.loanService = loanService;
    }

    @GetMapping
    public List<LoanResponse> getAllLoans() {
        return loanService.getAllLoans();
    }

    @GetMapping("/{id}")
    public LoanResponse getLoanById(@PathVariable UUID id) {
        return loanService.getLoanById(id);
    }

    @GetMapping("/customer/{customerId}")
    public List<LoanResponse> getLoansByCustomer(
            @PathVariable UUID customerId) {

        return loanService.getLoansByCustomer(customerId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public LoanResponse createLoan(
            @Valid @RequestBody LoanRequest request) {

        return loanService.createLoan(request);
    }

    @PutMapping("/{id}/approve")
    public LoanResponse approveLoan(
            @PathVariable UUID id) {

        return loanService.approveLoan(id);
    }

    @PutMapping("/{id}/reject")
    public LoanResponse rejectLoan(
            @PathVariable UUID id) {

        return loanService.rejectLoan(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteLoan(
            @PathVariable UUID id) {

        loanService.deleteLoan(id);
    }
}