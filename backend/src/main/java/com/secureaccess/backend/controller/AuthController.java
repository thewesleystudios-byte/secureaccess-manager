package com.secureaccess.backend.controller;

import com.secureaccess.backend.model.LoginRequest;
import com.secureaccess.backend.model.User;
import com.secureaccess.backend.security.JwtUtil;
import com.secureaccess.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        System.out.println("🟢 Login attempt for user: " + loginRequest.getUsername());
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getUsername(), loginRequest.getPassword()
                )
            );
            String token = jwtUtil.generateToken(loginRequest.getUsername());
            System.out.println("✅ Authentication success for user: " + loginRequest.getUsername());
            return ResponseEntity.ok(Map.of("token", token));
        } catch (Exception e) {
            System.out.println("❌ Authentication failed: " + e.getMessage());
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User newUser) {
        if (newUser.getRole() == null || newUser.getRole().isBlank()) {
            newUser.setRole("ROLE_USER");
        }
        userService.registerUser(newUser);
        return ResponseEntity.ok(Map.of("message", "User registered successfully"));
    }
}
