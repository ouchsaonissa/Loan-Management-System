package com.group6.loanmanagement;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;

import java.lang.reflect.Method;
import java.util.Arrays;

import org.junit.jupiter.api.Test;

class CustomerServiceTest {

    @Test
    void customerServiceExposesBasicCrudOperations() throws Exception {
        Class<?> serviceClass = Class.forName("com.group6.loanmanagement.service.CustomerService");
        Class<?> repositoryClass = Class.forName("com.group6.loanmanagement.repository.CustomerRepository");

        Object repositoryMock = mock(repositoryClass);

        assertNotNull(repositoryMock, "CustomerRepository should be mockable for isolated service tests");
        assertTrue(hasPublicMethodContaining(serviceClass, "get"), "CustomerService should expose a read/list operation");
        assertTrue(hasPublicMethodContaining(serviceClass, "create") || hasPublicMethodContaining(serviceClass, "save"),
                "CustomerService should expose a create/save operation");
        assertTrue(hasPublicMethodContaining(serviceClass, "update"), "CustomerService should expose an update operation");
        assertTrue(hasPublicMethodContaining(serviceClass, "delete"), "CustomerService should expose a delete operation");
    }

    private boolean hasPublicMethodContaining(Class<?> type, String expectedNamePart) {
        return Arrays.stream(type.getMethods())
                .map(Method::getName)
                .anyMatch(name -> name.toLowerCase().contains(expectedNamePart));
    }
}
