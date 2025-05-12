import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Custom validator function for future or present date
export function futureOrPresentDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Ignore time part

    if (selectedDate < currentDate) {
      return { pastDate: true }; // Return error if date is in the past
    }
    return null; // Return null if date is valid
  };
}