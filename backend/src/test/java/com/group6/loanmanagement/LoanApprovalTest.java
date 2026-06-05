package com.group6.loanmanagement;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

import org.junit.jupiter.api.Test;

class LoanApprovalTest {

    @Test
    void loanStatusSupportsPendingApprovedRejectedAndCompleted() throws Exception {
        Class<?> loanStatusClass = Class.forName("com.group6.loanmanagement.entity.LoanStatus");

        Set<String> statusNames = Arrays.stream(loanStatusClass.getEnumConstants())
                .map(Object::toString)
                .collect(Collectors.toSet());

        assertTrue(statusNames.contains("PENDING"), "LoanStatus should include PENDING");
        assertTrue(statusNames.contains("APPROVED"), "LoanStatus should include APPROVED");
        assertTrue(statusNames.contains("REJECTED"), "LoanStatus should include REJECTED");
        assertTrue(statusNames.contains("COMPLETED"), "LoanStatus should include COMPLETED");
    }

    @Test
    void loanServiceHasApprovalAndRejectionMethods() throws Exception {
        Class<?> loanServiceClass = Class.forName("com.group6.loanmanagement.service.LoanService");

        assertTrue(hasPublicMethodContaining(loanServiceClass, "approve"),
                "LoanService should include a public approve method for loan approval workflow");
        assertTrue(hasPublicMethodContaining(loanServiceClass, "reject"),
                "LoanService should include a public reject method for loan rejection workflow");
    }

    private boolean hasPublicMethodContaining(Class<?> type, String expectedNamePart) {
        return Arrays.stream(type.getMethods())
                .map(Method::getName)
                .anyMatch(name -> name.toLowerCase().contains(expectedNamePart));
    }
}
