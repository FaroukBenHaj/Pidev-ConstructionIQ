package tn.esprit.userdomain.auth.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.userdomain.auth.service.AuthentificationService;
import tn.esprit.userdomain.auth.request.AuthenticationRequest;
import tn.esprit.userdomain.auth.request.RegistrationRequest;
import tn.esprit.userdomain.auth.response.AuthenticationResponse;
import tn.esprit.userdomain.roles.Role;
import tn.esprit.userdomain.roles.RoleRepository;
import tn.esprit.userdomain.user.User;
import tn.esprit.userdomain.user.UserRepository;

@RestController
@RequestMapping("auth")
@Tag(name="Authentification")
public class AuthentificationController {
    @Autowired
    private final AuthentificationService authentificationService;

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final RoleRepository roleRepository;

    public AuthentificationController(AuthentificationService authentificationService, UserRepository userRepository, RoleRepository roleRepository) {
        this.authentificationService = authentificationService;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<?> register(@Valid @RequestBody RegistrationRequest request) throws MessagingException {
        authentificationService.registerUser(request);
        return ResponseEntity.accepted().build();
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody  @Valid AuthenticationRequest request){
        return ResponseEntity.ok(authentificationService.authenticate(request));
    }

    // Get mapping = > to activate an account
    @GetMapping("/activate-account")
    public void confirm( @RequestParam   String token) throws MessagingException {
        authentificationService.activateAccount(token);
    }


    @PutMapping("/make-admin/{userId}")
    public ResponseEntity<String> makeAdmin(@PathVariable Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        Role adminRole = roleRepository.findByRoleName("ROLE_ADMIN")
                .orElseThrow(() -> new RuntimeException("Rôle ADMIN introuvable"));

        user.getRoles().add(adminRole);
        userRepository.save(user);

        return ResponseEntity.ok("L'utilisateur a été promu ADMIN avec succès !");
    }

  



}
