package com.group6.loanmanagement.service;

import com.group6.loanmanagement.dto.AuthResponse;
import com.group6.loanmanagement.dto.LoginRequest;
import com.group6.loanmanagement.dto.RefreshTokenRequest;
import com.group6.loanmanagement.dto.RegisterRequest;
import com.group6.loanmanagement.entity.Customer;
import com.group6.loanmanagement.entity.RefreshToken;
import com.group6.loanmanagement.entity.Role;
import com.group6.loanmanagement.entity.User;
import com.group6.loanmanagement.repository.CustomerRepository;
import com.group6.loanmanagement.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    private static final Logger LOGGER = LoggerFactory.getLogger(AuthService.class);
    private static final String TOKEN_TYPE = "Bearer";

    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;

    public AuthService(UserRepository userRepository, CustomerRepository customerRepository, PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager, JwtService jwtService,
            RefreshTokenService refreshTokenService) {
        this.userRepository = userRepository;
        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.refreshTokenService = refreshTokenService;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        String username = requireRegistrationValue(request.getUsername(), "Username is required");
        if (userRepository.existsByUsername(username)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username already exists");
        }

        Role role = request.getRole() == null ? Role.CUSTOMER : request.getRole();

        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFullName(requireRegistrationValue(request.getFullName(), "Full name is required"));
        user.setRole(role);

        User savedUser = userRepository.save(user);
        if (savedUser.getRole() == Role.CUSTOMER) {
            LOGGER.info("Creating customer for user {}", savedUser.getUsername());
            Customer customer = buildCustomerFromRegistration(request, savedUser);
            Customer savedCustomer = customerRepository.save(customer);
            LOGGER.info("Customer saved with id {}", savedCustomer.getId());
        }

        RefreshToken refreshToken = refreshTokenService.createRefreshToken(savedUser);
        return buildAuthResponse(savedUser, refreshToken.getToken());
    }

    @Transactional
    public AuthResponse login(LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        } catch (AuthenticationException exception) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username or password");
        }

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username or password"));
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user);
        return buildAuthResponse(user, refreshToken.getToken());
    }

    @Transactional
    public AuthResponse refresh(RefreshTokenRequest request) {
        RefreshToken refreshToken = refreshTokenService.rotateRefreshToken(request.getRefreshToken());
        return buildAuthResponse(refreshToken.getUser(), refreshToken.getToken());
    }

    private Customer buildCustomerFromRegistration(RegisterRequest request, User savedUser) {
        String email = requireRegistrationValue(request.getEmail(), "Email is required for customer registration");
        if (customerRepository.existsByEmail(email)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Customer email already exists");
        }
        if (request.getMonthlyIncome() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Monthly income is required for customer registration");
        }

        Customer customer = new Customer();
        customer.setFullName(requireRegistrationValue(request.getFullName(),
                "Full name is required for customer registration"));
        customer.setGender(requireRegistrationValue(request.getGender(),
                "Gender is required for customer registration"));
        customer.setEmail(email);
        customer.setPhoneNumber(requireRegistrationValue(request.getPhoneNumber(),
                "Phone number is required for customer registration"));
        customer.setAddress(requireRegistrationValue(request.getAddress(),
                "Address is required for customer registration"));
        customer.setJob(requireRegistrationValue(request.getJob(),
                "Job is required for customer registration"));
        customer.setMonthlyIncome(request.getMonthlyIncome());
        customer.setUser(savedUser);
        return customer;
    }

    private String requireRegistrationValue(String value, String message) {
        if (value == null || value.trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, message);
        }
        return value.trim();
    }

    private AuthResponse buildAuthResponse(User user, String refreshToken) {
        return new AuthResponse(
                jwtService.generateAccessToken(user),
                refreshToken,
                TOKEN_TYPE,
                user.getId(),
                user.getUsername(),
                user.getFullName(),
                user.getRole());
    }
}
