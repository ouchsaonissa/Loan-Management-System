package com.group6.loanmanagement.service;

import com.group6.loanmanagement.dto.CustomerRequest;
import com.group6.loanmanagement.dto.CustomerResponse;
import com.group6.loanmanagement.entity.Customer;
import com.group6.loanmanagement.repository.CustomerRepository;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Transactional(readOnly = true)
    public List<CustomerResponse> getAllCustomers() {
        return customerRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public CustomerResponse getCustomerById(UUID id) {
        return toResponse(findCustomer(id));
    }

    @Transactional
    public CustomerResponse createCustomer(CustomerRequest request) {
        String email = normalize(request.getEmail());
        if (customerRepository.existsByEmail(email)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Customer email already exists");
        }

        Customer customer = new Customer();
        applyRequest(customer, request, email);
        return toResponse(customerRepository.save(customer));
    }

    @Transactional
    public CustomerResponse updateCustomer(UUID id, CustomerRequest request) {
        Customer customer = findCustomer(id);
        String email = normalize(request.getEmail());
        if (customerRepository.existsByEmailAndIdNot(email, id)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Customer email already exists");
        }

        applyRequest(customer, request, email);
        return toResponse(customerRepository.save(customer));
    }

    @Transactional
    public void deleteCustomer(UUID id) {
        Customer customer = findCustomer(id);
        customerRepository.delete(customer);
    }

    private Customer findCustomer(UUID id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Customer not found"));
    }

    private void applyRequest(Customer customer, CustomerRequest request, String email) {
        customer.setFullName(request.getFullName().trim());
        customer.setGender(request.getGender().trim());
        customer.setEmail(email);
        customer.setPhoneNumber(request.getPhoneNumber().trim());
        customer.setAddress(request.getAddress().trim());
        customer.setJob(request.getJob().trim());
        customer.setMonthlyIncome(request.getMonthlyIncome());
    }

    private String normalize(String value) {
        return value == null ? null : value.trim().toLowerCase();
    }

    private CustomerResponse toResponse(Customer customer) {
        return new CustomerResponse(
                customer.getId(),
                customer.getFullName(),
                customer.getGender(),
                customer.getEmail(),
                customer.getPhoneNumber(),
                customer.getAddress(),
                customer.getJob(),
                customer.getMonthlyIncome(),
                customer.getCreatedAt());
    }
}
