package com.licenta.back.jwtAuth.CustomResponses;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class CustomBadRequestResponse {

    public ResponseEntity<String> handleBadRequestException(String errorMessage) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
    }
}
