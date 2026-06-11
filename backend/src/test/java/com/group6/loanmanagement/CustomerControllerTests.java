package com.group6.loanmanagement;

import static org.hamcrest.Matchers.blankOrNullString;
import static org.hamcrest.Matchers.not;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
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
        "spring.datasource.url=jdbc:h2:mem:customer_controller_test;MODE=MySQL;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE",
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
class CustomerControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void customerEndpointsRequireAuthentication() throws Exception {
        mockMvc.perform(get("/api/customers"))
                .andExpect(status().isForbidden());
    }

    @Test
    void authenticatedUserCanCreateReadUpdateAndDeleteCustomer() throws Exception {
        String accessToken = registerAndGetAccessToken();
        String authorization = "Bearer " + accessToken;
        String email = "customer" + System.nanoTime() + "@example.com";

        MvcResult createResult = mockMvc.perform(post("/api/customers")
                        .header(HttpHeaders.AUTHORIZATION, authorization)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(customerJson("Sok Customer", "Female", email, "012345678", "Phnom Penh",
                                "Teacher", "650.00")))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", not(blankOrNullString())))
                .andExpect(jsonPath("$.fullName").value("Sok Customer"))
                .andExpect(jsonPath("$.gender").value("Female"))
                .andExpect(jsonPath("$.email").value(email))
                .andExpect(jsonPath("$.phoneNumber").value("012345678"))
                .andExpect(jsonPath("$.address").value("Phnom Penh"))
                .andExpect(jsonPath("$.job").value("Teacher"))
                .andExpect(jsonPath("$.monthlyIncome").value(650.00))
                .andExpect(jsonPath("$.createdAt", not(blankOrNullString())))
                .andReturn();

        String customerId = extractJsonValue(createResult.getResponse().getContentAsString(), "id");

        mockMvc.perform(get("/api/customers/{id}", customerId)
                        .header(HttpHeaders.AUTHORIZATION, authorization))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(customerId))
                .andExpect(jsonPath("$.email").value(email));

        mockMvc.perform(get("/api/customers")
                        .header(HttpHeaders.AUTHORIZATION, authorization))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id", not(blankOrNullString())));

        mockMvc.perform(put("/api/customers/{id}", customerId)
                        .header(HttpHeaders.AUTHORIZATION, authorization)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(customerJson("Updated Customer", "Female", email, "098765432", "Siem Reap",
                                "Manager", "900.00")))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(customerId))
                .andExpect(jsonPath("$.fullName").value("Updated Customer"))
                .andExpect(jsonPath("$.phoneNumber").value("098765432"))
                .andExpect(jsonPath("$.address").value("Siem Reap"))
                .andExpect(jsonPath("$.job").value("Manager"))
                .andExpect(jsonPath("$.monthlyIncome").value(900.00));

        mockMvc.perform(delete("/api/customers/{id}", customerId)
                        .header(HttpHeaders.AUTHORIZATION, authorization))
                .andExpect(status().isNoContent());

        mockMvc.perform(get("/api/customers/{id}", customerId)
                        .header(HttpHeaders.AUTHORIZATION, authorization))
                .andExpect(status().isNotFound());
    }

    private String registerAndGetAccessToken() throws Exception {
        String username = "customeruser" + System.nanoTime();
        MvcResult registerResult = mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "username": "%s",
                                  "password": "secret123",
                                  "fullName": "Customer API User",
                                  "role": "STAFF"
                                }
                                """.formatted(username)))
                .andExpect(status().isCreated())
                .andReturn();

        return extractJsonValue(registerResult.getResponse().getContentAsString(), "accessToken");
    }

    private String customerJson(String fullName, String gender, String email, String phoneNumber, String address,
            String job, String monthlyIncome) {
        return """
                {
                  "fullName": "%s",
                  "gender": "%s",
                  "email": "%s",
                  "phoneNumber": "%s",
                  "address": "%s",
                  "job": "%s",
                  "monthlyIncome": %s
                }
                """.formatted(fullName, gender, email, phoneNumber, address, job, monthlyIncome);
    }

    private String extractJsonValue(String json, String key) {
        return json.replaceAll(".*\\\"" + key + "\\\":\\\"([^\\\"]+)\\\".*", "$1");
    }
}
