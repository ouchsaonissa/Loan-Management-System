package com.group6.loanmanagement;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;

import java.lang.reflect.Method;
import java.util.Arrays;

import org.junit.jupiter.api.Test;

class LoanServiceTest {

    @Test
    void loanServiceExposesCrudAndDecisionOperations() throws Exception {
        Class<?> serviceClass = Class.forName("com.group6.loanmanagement.service.LoanService");
        Class<?> repositoryClass = Class.forName("com.group6.loanmanagement.repository.LoanRepository");

        Object repositoryMock = mock(repositoryClass);

        assertNotNull(repositoryMock, "LoanRepository should be mockable for isolated service tests");
        assertTrue(hasPublicMethodContaining(serviceClass, "get"), "LoanService should expose a read/list operation");
        assertTrue(hasPublicMethodContaining(serviceClass, "create") || hasPublicMethodContaining(serviceClass, "save"),
                "LoanService should expose a create/save operation");
        assertTrue(hasPublicMethodContaining(serviceClass, "update"), "LoanService should expose an update operation");
        assertTrue(hasPublicMethodContaining(serviceClass, "delete"), "LoanService should expose a delete operation");
        assertTrue(hasPublicMethodContaining(serviceClass, "approve"), "LoanService should expose an approve operation");
        assertTrue(hasPublicMethodContaining(serviceClass, "reject"), "LoanService should expose a reject operation");
    }

    private boolean hasPublicMethodContaining(Class<?> type, String expectedNamePart) {
        return Arrays.stream(type.getMethods())
                .map(Method::getName)
                .anyMatch(name -> name.toLowerCase().contains(expectedNamePart));
    }
}
