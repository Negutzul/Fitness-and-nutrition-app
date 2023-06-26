package com.licenta.back.jwtAuth;

import com.licenta.back.jwtAuth.CustomResponses.CustomBadRequestResponse;
import com.licenta.back.jwtAuth.Exceptions.EmailAlreadyExistsException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;



@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

  private final AuthenticationService service;

  public ResponseEntity<String> handleBadRequestException(String errorMessage) {
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
  }

  @PostMapping("/register")
  public Object register(
          @RequestBody RegisterRequest request
  ) {
    try {
      return (ResponseEntity<AuthenticationResponse>) ResponseEntity.ok(service.register(request));
    }catch (EmailAlreadyExistsException e){
      CustomBadRequestResponse c = new CustomBadRequestResponse();
      return c.handleBadRequestException(e.getMessage());
    }
  }
  @PostMapping("/registerTrainer")
  public Object registerTrainer(
          @RequestBody RegisterRequest request
  ) {
    try {
      return (ResponseEntity<AuthenticationResponse>) ResponseEntity.ok(service.registerTrainer(request));
    }catch (EmailAlreadyExistsException e){
      CustomBadRequestResponse c = new CustomBadRequestResponse();
      return c.handleBadRequestException(e.getMessage());
    }
  }


  @PostMapping("/registerAdmin")
  //ResponseEntity<AuthenticationResponse> nu obj
  public Object registerAdmin(
          @RequestBody RegisterRequest request
  ) {
//    return ResponseEntity.ok(service.registerAdmin(request));
    try {
      return (ResponseEntity<AuthenticationResponse>) ResponseEntity.ok(service.registerTrainer(request));
    }catch (EmailAlreadyExistsException e){
      CustomBadRequestResponse c = new CustomBadRequestResponse();
      return c.handleBadRequestException(e.getMessage());
    }
  }

  @PostMapping("/authenticate")
  public ResponseEntity<AuthenticationResponse> authenticate(
      @RequestBody AuthenticationRequest request
  ) {
    return ResponseEntity.ok(service.authenticate(request));
  }

  @PostMapping("/refresh-token")
  public void refreshToken(
      HttpServletRequest request,
      HttpServletResponse response
  ) throws IOException {
    service.refreshToken(request, response);
  }


}
