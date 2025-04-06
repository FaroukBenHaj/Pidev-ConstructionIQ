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
    private static final int TOKEN_LENGTH = 6;
    private static final int TOKEN_VALIDITY_MINUTES = 15;

    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final EmailService emailService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Value("${application.mailing.frontend.activation-url}")
    private String activationUrl;
    @Value("${application.mailing.frontend.reset-password-url}")
    private String resetPasswordUrl;

    public void registerUser(RegistrationRequest request) throws MessagingException {
        var userRole = roleRepository.findByRoleName("Role_USER")
                .orElseThrow(() -> new IllegalStateException("Role_USER not found"));

        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .accountLocked(false)
                .enabled(false)
                .roles(List.of(userRole))
                .build();

        userRepository.save(user);
        sendValidationEmail(user);
    }

    public void sendValidationEmail(User user) throws MessagingException {
        var newToken = generateAndSaveActivationToken(user);
        emailService.sendEmail(
                user.getEmail(),
                user.getFullName(),
                activationUrl,
                newToken,
                "Account Activation"
        );
    }

    public String generateAndSaveActivationToken(User user) {
        String generatedToken = generateActivationCode(TOKEN_LENGTH);
        var token = Token.builder()
                .token(generatedToken)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(TOKEN_VALIDITY_MINUTES))
                .user(user)
                .build();
        tokenRepository.save(token);
        return generatedToken;
    }

    private String generateActivationCode(int length) {
        String characters = "0123456789";
        StringBuilder activationCode = new StringBuilder();
        SecureRandom secureRandom = new SecureRandom();
        for (int i = 0; i < length; i++) {
            activationCode.append(characters.charAt(secureRandom.nextInt(characters.length())));
        }
        return activationCode.toString();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        var auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var claims = new HashMap<String, Object>();
        var user = ((User) auth.getPrincipal());
        claims.put("fullName", user.getFullName());
        var jwtToken = jwtService.generateJwt(claims, user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    @Transactional
    public void activateAccount(String token) throws MessagingException {
        Token savedToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token"));

        if (LocalDateTime.now().isAfter(savedToken.getExpiresAt())) {
            sendValidationEmail(savedToken.getUser());
            throw new RuntimeException("Activation token has expired. A new token has been sent to your email.");
        }

        var user = userRepository.findById(savedToken.getUser().getIdUser())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        user.setEnabled(true);
        userRepository.save(user);

        savedToken.setValidatedAt(LocalDateTime.now());
        tokenRepository.save(savedToken);
    }

    public void forgotPassword(String email) throws MessagingException {
        // Don't throw exception if user not found - security best practice
        userRepository.findByEmail(email).ifPresent(user -> {
            try {
                if (!user.isEnabled()) {
                    throw new RuntimeException("Account is not activated");
                }

                String resetToken = generateAndSaveResetToken(user);
                String resetUrl = resetPasswordUrl + "?token=" + resetToken;

                emailService.sendResetPasswordEmail(
                        user.getEmail(),
                        user.getFullName(),
                        resetUrl
                );
            } catch (MessagingException e) {
                throw new RuntimeException("Failed to send reset password email", e);
            }
        });
    }

    @Transactional
    public void resetPassword(String token, String newPassword) {
        Token resetToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token"));

        validateResetToken(resetToken);

        var user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        resetToken.setValidatedAt(LocalDateTime.now());
        tokenRepository.save(resetToken);
    }

    private void validateResetToken(Token token) {
        if (LocalDateTime.now().isAfter(token.getExpiresAt())) {
            throw new RuntimeException("Token has expired");
        }
        if (token.getValidatedAt() != null) {
            throw new RuntimeException("Token already used");
        }
    }

    private String generateAndSaveResetToken(User user) {
        String generatedToken = generateActivationCode(TOKEN_LENGTH);
        var token = Token.builder()
                .token(generatedToken)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(TOKEN_VALIDITY_MINUTES))
                .user(user)
                .build();
        tokenRepository.save(token);
        return generatedToken;
    }
}