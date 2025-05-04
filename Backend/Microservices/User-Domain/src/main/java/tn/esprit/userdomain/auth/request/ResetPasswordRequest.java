package tn.esprit.userdomain.auth.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ResetPasswordRequest {
  private  String currentPasword;
  private String newPassword ;
  private String confirmPassword;
}
