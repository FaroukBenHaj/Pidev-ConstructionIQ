package tn.esprit.userdomain.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Service;
import tn.esprit.userdomain.auth.request.ResetPasswordRequest;
import tn.esprit.userdomain.user.User;
import tn.esprit.userdomain.user.UserRepository;

import java.security.Principal;

@Service
@RequiredArgsConstructor
public class UserService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public void resetPassword(ResetPasswordRequest request, Principal connectedUser) {

        var user = ((User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal());
        // check if the current pass is correct

        if (!passwordEncoder.matches(request.getCurrentPasword(), user.getPassword())){
            throw new IllegalStateException("Wrong password");
        }
        if(!request.getNewPassword().equals(request.getConfirmPassword())){
            throw new IllegalStateException("Passwords do not match");
        }
        //update
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        //save
        userRepository.save(user);
    }
}
