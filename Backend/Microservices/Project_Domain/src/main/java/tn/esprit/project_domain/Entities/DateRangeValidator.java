package tn.esprit.project_domain.Entities;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class DateRangeValidator implements ConstraintValidator<ValidDateRange, Project> {
    @Override
    public boolean isValid(Project yourClass, ConstraintValidatorContext context) {
        if (yourClass.getStartDate() == null || yourClass.getEndDate() == null) {
            return true; 
        }
        return yourClass.getEndDate().after(yourClass.getStartDate());
    }
}