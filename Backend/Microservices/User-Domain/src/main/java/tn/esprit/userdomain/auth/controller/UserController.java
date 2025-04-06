package tn.esprit.userdomain.auth.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.userdomain.auth.request.ResetPasswordRequest;
import tn.esprit.userdomain.auth.service.UserService;

import java.security.Principal;

@RestController
@RequestMapping("user")
@Tag(name="User")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PatchMapping("reset-password")
    public ResponseEntity<?> changePassword( @RequestBody ResetPasswordRequest request ,
                                             Principal connectedUser
    ){
    userService.resetPassword(request , connectedUser);
    return ResponseEntity.ok().build();
    }

}
