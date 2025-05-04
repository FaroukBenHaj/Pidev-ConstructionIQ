package tn.esprit.userdomain.auth.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import tn.esprit.userdomain.auth.LoginAttempt;
import tn.esprit.userdomain.auth.request.ResetPasswordRequest;
import tn.esprit.userdomain.auth.service.AuthentificationService;
import tn.esprit.userdomain.auth.request.AuthenticationRequest;
import tn.esprit.userdomain.auth.request.RegistrationRequest;
import tn.esprit.userdomain.auth.response.AuthenticationResponse;
import tn.esprit.userdomain.roles.Role;
import tn.esprit.userdomain.roles.RoleRepository;
import tn.esprit.userdomain.user.User;
import tn.esprit.userdomain.user.UserRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("auth/")
@Tag(name="Authentification")
@RequiredArgsConstructor
public class AuthentificationController {

    @GetMapping("admin/hello")
    public ResponseEntity<String> getAdminData()
    { return new ResponseEntity<>("Admin Data", HttpStatus.OK); }


    @GetMapping("/dashboard")
    public String showDashboard() {
        return "admin-dashboard"; // Shows admin-dashboard.html
    }

    @PostMapping("/detect")
    public ResponseEntity<String> detectAnomaly(@RequestBody List<LoginAttempt> attempts) {
        // Filter attempts from last 5 minutes
        List<LoginAttempt> recentAttempts = attempts.stream()
                .filter(a -> a.getTimestamp().isAfter(LocalDateTime.now().minusMinutes(5)))
                .collect(Collectors.toList());

        long failedCount = recentAttempts.stream()
                .filter(a -> !a.isSuccess())
                .count();

        if (failedCount > 5) {
            return ResponseEntity.ok("Suspicious activity detected!");
        }
        return ResponseEntity.ok("Normal activity");
    }


//    private final AuthentificationService authentificationService;
//
//    private final UserRepository userRepository;
//
//    private final RoleRepository roleRepository;
//
//
//    @PostMapping("/register")
//    @ResponseStatus(HttpStatus.ACCEPTED)
//    public ResponseEntity<?> register(@Valid @RequestBody RegistrationRequest request) throws MessagingException {
//        authentificationService.registerUser(request);
//        return ResponseEntity.accepted().build();
//    }
//
//    @PostMapping("/authenticate")
//    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody  @Valid AuthenticationRequest request){
//        return ResponseEntity.ok(authentificationService.authenticate(request));
//    }
//
//    // Get mapping = > to activate an account
//    @GetMapping("/activate-account")
//    public void confirm( @RequestParam   String token) throws MessagingException {
//        authentificationService.activateAccount(token);
//    }
//
//
//    @PutMapping("/make-admin/{userId}")
//    public ResponseEntity<String> makeAdmin(@PathVariable Long userId) {
//        User user = userRepository.findById(userId)
//                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
//
//        Role adminRole = roleRepository.findByRoleName("ROLE_ADMIN")
//                .orElseThrow(() -> new RuntimeException("Rôle ADMIN introuvable"));
//
//        user.getRoles().add(adminRole);
//        userRepository.save(user);
//
//        return ResponseEntity.ok("L'utilisateur a été promu ADMIN avec succès !");
//    }
//
}
