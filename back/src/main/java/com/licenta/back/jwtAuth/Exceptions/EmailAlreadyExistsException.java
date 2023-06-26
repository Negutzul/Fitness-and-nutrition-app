package com.licenta.back.jwtAuth.Exceptions;

public class EmailAlreadyExistsException extends Exception {

    public EmailAlreadyExistsException(String errorMessage) {
        super(errorMessage);
    }
}