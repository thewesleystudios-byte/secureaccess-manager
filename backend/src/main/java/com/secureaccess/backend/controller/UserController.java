package com.secureaccess.backend.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public Map<String, String> userDashboard() {
        System.out.println("✅ Accessed /api/user/dashboard");
        return Map.of("message", "Welcome to the User Dashboard 🌟");
    }

    @GetMapping("/profile")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public Map<String, String> userProfile() {
        System.out.println("✅ Accessed /api/user/profile");
        return Map.of("message", "This is your profile information endpoint 👨‍💻");
    }
}
