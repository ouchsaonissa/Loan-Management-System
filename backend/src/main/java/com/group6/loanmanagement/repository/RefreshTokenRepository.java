package com.group6.loanmanagement.repository;

import com.group6.loanmanagement.entity.RefreshToken;
import com.group6.loanmanagement.entity.User;
import java.time.Instant;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, UUID> {

    Optional<RefreshToken> findByToken(String token);

    void deleteByToken(String token);

    void deleteByUser(User user);

    void deleteByExpiresAtBefore(Instant now);
}
