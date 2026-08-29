package com.group6.loanmanagement;

import static org.hamcrest.Matchers.not;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.blankOrNullString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

@SpringBootTest(properties = {
        "spring.datasource.url=jdbc:h2:mem:auth_controller_test;MODE=MySQL;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE",
        "spring.datasource.driver-class-name=org.h2.Driver",
        "spring.datasource.username=sa",
        "spring.datasource.password=",
        "spring.jpa.hibernate.ddl-auto=create-drop",
        "spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.H2Dialect",
        "app.jwt.secret=test-secret-key-for-jwt-authentication-that-is-long-enough",
        "app.jwt.access-token-expiration=900000",
        "app.jwt.refresh-token-expiration=604800000"
})
@AutoConfigureMockMvc
class AuthControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void registerCreatesCustomerFromRegistrationFields() throws Exception {
        String username = "registeredcustomer" + System.nanoTime();

        MvcResult registerResult = mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "username": "%s",
                                  "password": "secret123",
                                  "fullName": "Hiem Rika",
                                  "email": "%s@example.com",
                                  "gender": "Female",
                                  "phoneNumber": "012345678",
                                  "address": "Phnom Penh",
                                  "job": "Teacher",
                                  "monthlyIncome": 700.50
                                }
                                """.formatted(username, username)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.role").value("CUSTOMER"))
                .andExpect(jsonPath("$.customerId", not(blankOrNullString())))
                .andReturn();

        String accessToken = registerResult.getResponse().getContentAsString()
                .replaceAll(".*\"accessToken\":\"([^\"]+)\".*", "$1");

        mockMvc.perform(get("/api/customers")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[?(@.email == '%s@example.com')].fullName".formatted(username),
                        hasItem("Hiem Rika")))
                .andExpect(jsonPath("$[?(@.email == '%s@example.com')].gender".formatted(username),
                        hasItem("Female")))
                .andExpect(jsonPath("$[?(@.email == '%s@example.com')].phoneNumber".formatted(username),
                        hasItem("012345678")))
                .andExpect(jsonPath("$[?(@.email == '%s@example.com')].address".formatted(username),
                        hasItem("Phnom Penh")))
                .andExpect(jsonPath("$[?(@.email == '%s@example.com')].job".formatted(username),
                        hasItem("Teacher")))
                .andExpect(jsonPath("$[?(@.email == '%s@example.com')].monthlyIncome".formatted(username),
                        hasItem(700.50)));
    }

    @Test
    void customerLoginReturnsLinkedCustomerIdAndAdminLoginRemainsUnchanged() throws Exception {
        String username = "customerlogin" + System.nanoTime();

        MvcResult registration = mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "username": "%s",
                                  "password": "secret123",
                                  "fullName": "Customer Login",
                                  "email": "%s@example.com",
                                  "gender": "Female",
                                  "phoneNumber": "012345678",
                                  "address": "Phnom Penh",
                                  "job": "Teacher",
                                  "monthlyIncome": 700.50
                                }
                                """.formatted(username, username)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.userId", not(blankOrNullString())))
                .andExpect(jsonPath("$.customerId", not(blankOrNullString())))
                .andReturn();

        String customerId = extractJsonValue(registration.getResponse().getContentAsString(), "customerId");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "username": "%s",
                                  "password": "secret123"
                                }
                                """.formatted(username)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.customerId").value(customerId));

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "username": "admin",
                                  "password": "admin123"
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.userId", not(blankOrNullString())))
                .andExpect(jsonPath("$.customerId").doesNotExist());
    }

    @Test
    void customerRegistrationRequiresCustomerFields() throws Exception {
        String username = "missingcustomerfields" + System.nanoTime();

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "username": "%s",
                                  "password": "secret123",
                                  "fullName": "Missing Customer Fields"
                                }
                                """.formatted(username)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void registerLoginAndRefreshReturnTokens() throws Exception {
        String username = "authuser" + System.nanoTime();
        String registerJson = """
                {
                  "username": "%s",
                  "password": "secret123",
                  "fullName": "Authentication User",
                  "role": "STAFF"
                }
                """.formatted(username);

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(registerJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.accessToken", not(blankOrNullString())))
                .andExpect(jsonPath("$.refreshToken", not(blankOrNullString())))
                .andExpect(jsonPath("$.tokenType").value("Bearer"))
                .andExpect(jsonPath("$.userId", not(blankOrNullString())))
                .andExpect(jsonPath("$.username").value(username))
                .andExpect(jsonPath("$.fullName").value("Authentication User"))
                .andExpect(jsonPath("$.role").value("STAFF"));

        MvcResult loginResult = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "username": "%s",
                                  "password": "secret123"
                                }
                                """.formatted(username)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accessToken", not(blankOrNullString())))
                .andExpect(jsonPath("$.refreshToken", not(blankOrNullString())))
                .andReturn();

        String loginBody = loginResult.getResponse().getContentAsString();
        String refreshToken = loginBody.replaceAll(".*\\\"refreshToken\\\":\\\"([^\\\"]+)\\\".*", "$1");

        mockMvc.perform(post("/api/auth/refresh")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "refreshToken": "%s"
                                }
                                """.formatted(refreshToken)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accessToken", not(blankOrNullString())))
                .andExpect(jsonPath("$.refreshToken", not(blankOrNullString())))
                .andExpect(jsonPath("$.username").value(username));
    }

    private String extractJsonValue(String json, String key) {
        return json.replaceAll(".*\\\"" + key + "\\\":\\\"([^\\\"]+)\\\".*", "$1");
    }
}
