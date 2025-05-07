package tn.esprit.userdomain.handlerr;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.util.Map;
import java.util.Set;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class ExceptionResponse {
    private int businessErrorCode;
    private String businessErrorMessage;
    private String error;
    private Set<String> validationErrors;
    private Map<String , String> errors;
}
