package tn.esprit.userdomain.auth.service;

import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tn.esprit.userdomain.auth.request.AuthenticationRequest;
import tn.esprit.userdomain.auth.request.RegistrationRequest;
import tn.esprit.userdomain.auth.response.AuthenticationResponse;
import tn.esprit.userdomain.email.EmailService;
import tn.esprit.userdomain.roles.RoleRepository;
import tn.esprit.userdomain.security.JwtService;
import tn.esprit.userdomain.user.Token;
import tn.esprit.userdomain.user.TokenRepository;
import tn.esprit.userdomain.user.User;
import tn.esprit.userdomain.user.UserRepository;


import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthentificationService {
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final EmailService emailService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    @Value("${application.mailing.frontend.activation-url}")
    private String activationUrl;

    public void registerUser(RegistrationRequest request) throws MessagingException {
        // Get the "ROLE_USER" role from the database
        var userRole = roleRepository.findByRoleName("Role_USER")
                .orElseThrow(() -> new IllegalStateException("Role not found"));

        // Create a new user
        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .accountLocked(false)
                .enabled(false)
                .roles(List.of(userRole))
                .build();

        // Save the user in the database
        userRepository.save(user);

        // Send validation email
        sendValidationEmail(user);
    }


    private void sendValidationEmail(User user)  throws MessagingException {
        var newToken = generateAndSaveActivationToken(user);

        //send Email
        emailService.sendEmail(
                user.getEmail() ,
                user.getFullName(),
                activationUrl,
                newToken,
                "Account Activation"
        );

    }

    private String generateAndSaveActivationToken(User user) {
        // generate a token
        String generatedToken = generateActivationCode(6);
        var token = Token.builder()
                .token(generatedToken)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(15))
                .user(user)
                .build();
        // save a token

        tokenRepository.save(token);
        return  generatedToken ;
    }

    private String generateActivationCode(int length) {
        String character = "0123456789";
        StringBuilder activationCode = new StringBuilder();
        SecureRandom secureRandom = new SecureRandom();
        for (int i = 0; i < length; i++) {
            int randomIndex = secureRandom.nextInt(character.length());
            activationCode.append(character.charAt(randomIndex));

        }
        return activationCode.toString();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request){
        var auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var claims = new HashMap<String , Object>();
        var user = ((User) auth.getPrincipal());
        claims.put("fullName", user.getFullName());
        var jwtToken = jwtService.generateJwt(claims , user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    @Transactional
    public void activateAccount(String token) throws MessagingException {
        Token savedToken = tokenRepository.findByToken(token).orElseThrow(() -> new RuntimeException("Invalid Token"));
        if(LocalDateTime.now().isAfter(savedToken.getExpiresAt())){
            sendValidationEmail(savedToken.getUser());
            throw new RuntimeException("Activation token has expired !! check your email for the new token ");
        }
        var user = userRepository.findById(savedToken.getUser()
                .getIdUser()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        user.setEnabled(true);
        userRepository.save(user);
        savedToken.setValidatedAt(LocalDateTime.now());
        tokenRepository.save(savedToken);

    }
}
