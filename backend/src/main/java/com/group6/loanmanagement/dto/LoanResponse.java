package com.group6.loanmanagement.dto;

import com.group6.loanmanagement.entity.LoanStatus;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

public class LoanResponse {

    private UUID id;
    private UUID customerId;
    private BigDecimal amount;
    private Integer termMonths;
    private LoanStatus status;
    private Instant createdAt;

    public LoanResponse() {
    }

    public LoanResponse(
            UUID id,
            UUID customerId,
            BigDecimal amount,
            Integer termMonths,
            LoanStatus status,
            Instant createdAt) {

        this.id = id;
        this.customerId = customerId;
        this.amount = amount;
        this.termMonths = termMonths;
        this.status = status;
        this.createdAt = createdAt;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getCustomerId() {
        return customerId;
    }

    public void setCustomerId(UUID customerId) {
        this.customerId = customerId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Integer getTermMonths() {
        return termMonths;
    }

    public void setTermMonths(Integer termMonths) {
        this.termMonths = termMonths;
    }

    public LoanStatus getStatus() {
        return status;
    }

    public void setStatus(LoanStatus status) {
        this.status = status;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}