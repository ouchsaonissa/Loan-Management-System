# Least-Risk Modernization Plan for Loan Management System

## Executive Summary

This project is already aligned with the safest modernization path for a Spring Boot application:

- Java: 21
- Spring Boot: 3.3.5
- Current line: Spring Boot 3.x

The recommended strategy is to remain on the Spring Boot 3.x line, avoid a major framework jump, harden configuration, isolate environment-specific settings, pin critical dependency versions, and execute only minor or patch-level upgrades. This minimizes migration risk while keeping the app current and production-friendly.

## Current State Assessment

### Confirmed baseline
- Java 21 is already in use and is a stable LTS baseline.
- Spring Boot 3.3.5 is already active.
- The application is already using a modern Spring Boot 3 stack with Spring Security, JPA, Actuator, and MySQL.
- The highest-value improvement is not a major upgrade, but a stabilization and hardening pass around configuration and dependency hygiene.

### Risk profile
- The main modernization risks are configuration drift, secret leakage, and dependency version instability rather than framework incompatibility.
- A direct move to Boot 4 or a cross-version rewrite would create unnecessary risk.
- The application is better served by incremental hardening on the existing Boot 3.3.x baseline.

## Modernization Objective

Achieve a low-risk, production-ready Spring Boot 3.x posture by:

1. Keeping the application on Spring Boot 3.3.x and Java 21
2. Moving from implicit/default configuration to explicit environment-aware configuration
3. Separating runtime profiles for `dev`, `test`, and `prod`
4. Pinning and auditing critical dependencies, especially security-sensitive libraries
5. Upgrading only to the next stable minor/patch versions as needed
6. Validating build, tests, runtime health, and deployment configuration before release

---

## Workstreams

### 1) Baseline and control
Purpose: confirm the current application state and lock in a known-good foundation.

Actions:
- Confirm package and runtime versions from the build file and application startup logs
- Capture current test baseline using Maven
- Record known runtime behavior before configuration and dependency changes
- Freeze the approved track: Spring Boot 3.3.x only; no Boot 4 migration

Validation gate:
- Command: `./mvnw test`
- Pass criteria:
  - Build succeeds
  - Unit tests pass
  - Startup logs show Spring Boot 3.3.x and Java 21

### 2) Secure configuration and profile-based deployment
Purpose: remove secret drift and make runtime configuration environment-aware.

Actions:
- Externalize database URL, username, password, and JWT secret into environment variables or secret stores
- Split configuration into profile-specific files
  - `application.yml` for shared defaults
  - `application-dev.yml` for local development
  - `application-test.yml` for CI/test validation
  - `application-prod.yml` for deployment secrets and prod tuning
- Replace hard-coded/insecure defaults with clearly required environment variables
- Validate that no production credential exists in versioned source files

Examples of required parameters:
- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`
- `JWT_SECRET`
- `JWT_ACCESS_TOKEN_EXPIRATION`
- `JWT_REFRESH_TOKEN_EXPIRATION`
- `SERVER_PORT`

Validation gate:
- Command: `SPRING_PROFILES_ACTIVE=test ./mvnw test`
- Pass criteria:
  - Test profile loads successfully
  - No secret values are hard-coded in tracked configs
  - Startup succeeds without local secrets in source control

### 3) Dependency pinning and review
Purpose: reduce surprise upgrades and keep the dependency tree stable.

Actions:
- Review all direct dependencies for explicit versions and compatibility with Spring Boot 3.3.x
- Pin or own the versions of security-sensitive libraries (JWT, database driver, and any Spring-managed dependencies)
- Confirm Maven dependency management stays consistent with the Boot bill of materials
- Perform a dependency audit and reduce unnecessary drift
- Use release notes only for patch/minor updates within the same major line

Validation gate:
- Command: `./mvnw dependency:tree`
- Pass criteria:
  - Dependency tree remains consistent with the approved Boot 3.3.x line
  - No unexpected large upgrades or conflicting versions are introduced
  - Critical libraries are explicitly reviewed and pinned where needed

### 4) Minor and patch upgrades only
Purpose: keep the stack current without introducing framework churn.

Actions:
- Upgrade to the latest available Spring Boot 3.3.x patch release if needed
- Apply incremental Maven/plugin updates only when they are well-supported within the Boot 3.x line
- Avoid Boot 4 or other breaking framework transitions during this modernization pass
- Review release notes for any fix relevant to security, actuator, or configuration handling

Validation gate:
- Command: `./mvnw clean verify`
- Pass criteria:
  - Application compiles and tests cleanly after the upgrade
  - No regressions in Web, JPA, Security, or Actuator layers
  - Artifact still runs under Java 21

### 5) Operational readiness and deployment safety
Purpose: ensure the application is safe to run in a profile-driven environment.

Actions:
- Confirm actuator health endpoint is enabled and safe for deployment checks
- Verify application uses profiles for environment-specific deployment settings
- Confirm secure/expected runtime networking, server port, and DB configuration
- Keep local development settings separate from production values
- Avoid introducing new infrastructure or managed services beyond the current architecture

Validation gate:
- Command: `./mvnw spring-boot:run` with a test or dev profile, then `curl http://localhost:8080/actuator/health`
- Pass criteria:
  - App starts successfully
  - Health endpoint returns healthy status
  - Deployment configuration is environment-specific and non-ambiguous

---

## Recommended Execution Sequence

1. Baseline validation and freeze current Boot 3.3.5 state
2. Harden configuration by moving secrets and environment-specific values to profile-driven properties
3. Review and pin critical dependencies
4. Apply minor/patch updates only within the Boot 3.x line
5. Re-run full verification and health checks
6. Prepare release with deployment notes and environment configuration checklist

---

## Acceptance Criteria

The modernization effort is considered complete when all of the following are true:

- The project remains on Spring Boot 3.3.x and Java 21
- No framework jump to Spring Boot 4 is introduced
- Configuration is externalized and profile-aware
- Secrets are not committed to source control
- Dependencies are reviewed and pinned appropriately
- The build, tests, and runtime smoke checks all pass
- The application exposes a safe health endpoint and can start in a controlled environment

---

## Validation Checklist

### Build and code quality
- [ ] `./mvnw clean test`
- [ ] `./mvnw clean verify`

### Runtime configuration
- [ ] `application.yml` contains only shared defaults
- [ ] `application-dev.yml`, `application-test.yml`, and `application-prod.yml` isolate environment-specific values
- [ ] Secrets are supplied through environment variables or a managed secret system

### Security and dependency hygiene
- [ ] Dependency tree reviewed
- [ ] Security-sensitive dependencies checked for current compatible versions
- [ ] Unnecessary upgrade scope avoided

### Operational validation
- [ ] Health endpoint enabled
- [ ] App starts successfully in a non-prod profile
- [ ] `curl http://localhost:8080/actuator/health` returns healthy

## Final Recommendation

Do not pursue a broad framework migration. The least-risk modernization path is to keep the project on the existing Spring Boot 3.3.x line, improve configuration discipline, and perform careful dependency maintenance. This preserves a stable Java 21 foundation while reducing operational and security exposure.
