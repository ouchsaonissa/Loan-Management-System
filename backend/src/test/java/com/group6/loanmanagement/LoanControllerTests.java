package com.group6.loanmanagement;

import static org.hamcrest.Matchers.blankOrNullString;
import static org.hamcrest.Matchers.not;
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
        "spring.datasource.url=jdbc:h2:mem:loan_controller_test;MODE=MySQL;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE",
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
class LoanControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void createsLoanForCustomerIdAndRejectsUnknownCustomerId() throws Exception {
        String username = "loanapplicant" + System.nanoTime();
        MvcResult registration = mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "username": "%s",
                                  "password": "secret123",
                                  "fullName": "Loan Applicant",
                                  "email": "%s@example.com",
                                  "gender": "Male",
                                  "phoneNumber": "012345678",
                                  "address": "Phnom Penh",
                                  "job": "Teacher",
                                  "monthlyIncome": 700.50
                                }
                                """.formatted(username, username)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.customerId", not(blankOrNullString())))
                .andReturn();

        String response = registration.getResponse().getContentAsString();
        String accessToken = extractJsonValue(response, "accessToken");
        String customerId = extractJsonValue(response, "customerId");

        mockMvc.perform(post("/api/loans")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "customerId": "%s",
                                  "amount": 1500.00,
                                  "termMonths": 12
                                }
                                """.formatted(customerId)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.customerId").value(customerId));

        mockMvc.perform(post("/api/loans")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "customerId": "00000000-0000-0000-0000-000000000001",
                                  "amount": 1500.00,
                                  "termMonths": 12
                                }
                                """))
                .andExpect(status().isNotFound());
    }

    private String extractJsonValue(String json, String key) {
        return json.replaceAll(".*\\\"" + key + "\\\":\\\"([^\\\"]+)\\\".*", "$1");
    }
}
