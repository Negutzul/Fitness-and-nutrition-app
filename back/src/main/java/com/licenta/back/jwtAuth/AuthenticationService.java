package com.licenta.back.jwtAuth;

import com.licenta.back.jwtAuth.Exceptions.EmailAlreadyExistsException;
import com.licenta.back.jwtConfig.JwtService;
import com.licenta.back.jwtToken.Token;
import com.licenta.back.jwtToken.TokenRepository;
import com.licenta.back.jwtToken.TokenType;
import com.licenta.back.models.Locker;
import com.licenta.back.repository.LockerRepository;
import com.licenta.back.user.Role;
import com.licenta.back.user.User;
import com.licenta.back.user.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
  private final UserRepository repository;

  private final LockerRepository lockerRepository;

  private final TokenRepository tokenRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;

  public AuthenticationResponse register(RegisterRequest request) throws EmailAlreadyExistsException {
    if(!repository.findByEmail(request.getEmail()).isEmpty()){
      throw new EmailAlreadyExistsException("email already exists ");
    }

    var user = User.builder()
            .firstname(request.getFirstname())
            .lastname(request.getLastname())
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .role(Role.USER)
            .build();
    var savedUser = repository.save(user);

    var lock = Locker.builder().user(savedUser).build();
    var savedLock = lockerRepository.save(lock);
    savedUser.setLocker(savedLock);
    repository.save(savedUser);

    var jwtToken = jwtService.generateToken(user,user.getRole());
    var refreshToken = jwtService.generateRefreshToken(user);
    saveUserToken(savedUser, jwtToken);
    return AuthenticationResponse.builder()
            .accessToken(jwtToken)
            .refreshToken(refreshToken)
            .build();
  }

  public AuthenticationResponse registerTrainer(RegisterRequest request) throws EmailAlreadyExistsException {
    if(!repository.findByEmail(request.getEmail()).isEmpty()){
      throw new EmailAlreadyExistsException("email already exists ");
    }

    var user = User.builder()
            .firstname(request.getFirstname())
            .lastname(request.getLastname())
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .role(Role.TRAINER)
            .build();

    var savedUser = repository.save(user);
    var lock = Locker.builder().user(savedUser).build();
    var savedLock = lockerRepository.save(lock);
    savedUser.setLocker(savedLock);
    repository.save(savedUser);

    var jwtToken = jwtService.generateToken(user,user.getRole());
    var refreshToken = jwtService.generateRefreshToken(user);

    saveUserToken(savedUser, jwtToken);
    return AuthenticationResponse.builder()
            .accessToken(jwtToken)
            .refreshToken(refreshToken)
            .build();
  }


  public AuthenticationResponse registerAdmin(RegisterRequest request) throws EmailAlreadyExistsException {
    if(!repository.findByEmail(request.getEmail()).isEmpty()){
      throw new EmailAlreadyExistsException("email already exists ");
    }
    var user = User.builder()
            .firstname(request.getFirstname())
            .lastname(request.getLastname())
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .role(Role.ADMIN)
            .build();

    var savedUser = repository.save(user);
    var lock = Locker.builder().user(savedUser).build();
    var savedLock = lockerRepository.save(lock);
    savedUser.setLocker(savedLock);
    repository.save(savedUser);

    var jwtToken = jwtService.generateToken(user,user.getRole());
    var refreshToken = jwtService.generateRefreshToken(user);

    saveUserToken(savedUser, jwtToken);
    return AuthenticationResponse.builder()
            .accessToken(jwtToken)
            .refreshToken(refreshToken)
            .build();
  }

  public AuthenticationResponse authenticate(AuthenticationRequest request) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            request.getEmail(),
            request.getPassword()
        )
    );
    var user = repository.findByEmail(request.getEmail())
        .orElseThrow();
    var jwtToken = jwtService.generateToken(user,user.getRole());
    var refreshToken = jwtService.generateRefreshToken(user);
    revokeAllUserTokens(user);
    saveUserToken(user, jwtToken);
    return AuthenticationResponse.builder()
        .accessToken(jwtToken)
            .refreshToken(refreshToken)
        .build();
  }

  private void saveUserToken(User user, String jwtToken) {
    var token = Token.builder()
        .user(user)
        .token(jwtToken)
        .tokenType(TokenType.BEARER)
        .expired(false)
        .revoked(false)
        .build();
    tokenRepository.save(token);
  }

  private void revokeAllUserTokens(User user) {
    var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
    if (validUserTokens.isEmpty())
      return;
    validUserTokens.forEach(token -> {
      token.setExpired(true);
      token.setRevoked(true);
    });
    tokenRepository.saveAll(validUserTokens);
  }

  public void refreshToken(
          HttpServletRequest request,
          HttpServletResponse response
  ) throws IOException {
    final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
    final String refreshToken;
    final String userEmail;
    if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
      return;
    }
    refreshToken = authHeader.substring(7);
    userEmail = jwtService.extractUsername(refreshToken);
    if (userEmail != null) {
      var user = this.repository.findByEmail(userEmail)
              .orElseThrow();
      if (jwtService.isTokenValid(refreshToken, user)) {
        var accessToken = jwtService.generateToken(user,user.getRole());
        revokeAllUserTokens(user);
        saveUserToken(user, accessToken);
        var authResponse = AuthenticationResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
        new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
      }
    }
  }
}
