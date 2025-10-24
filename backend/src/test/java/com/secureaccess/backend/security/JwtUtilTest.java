package com.secureaccess.backend.security;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(classes = JwtUtil.class)
@TestPropertySource(properties = {
        "jwt.secret=testtesttesttesttesttesttesttesttesttest123456",
        "jwt.expiration=86400000"
})
class JwtUtilTest {

    @Autowired
    private JwtUtil jwtUtil;

    @Test
    void createsAndValidatesToken() {
        String token = jwtUtil.generateToken("alice");
        assertTrue(jwtUtil.validateToken(token));
        assertEquals("alice", jwtUtil.extractUsername(token));
    }
}
