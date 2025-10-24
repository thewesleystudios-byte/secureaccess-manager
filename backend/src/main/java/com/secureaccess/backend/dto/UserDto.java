package com.secureaccess.backend.dto;

public record UserDto(Long id, String username, String role, boolean active) {}
