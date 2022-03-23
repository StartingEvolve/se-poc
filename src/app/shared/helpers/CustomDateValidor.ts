import { AbstractControl, ValidatorFn } from '@angular/forms';

export class CustomDateValidator {
  static fromToDate(
    fromDateField: string,
    toDateField: string,
    errorName: string = 'fromToDate'
  ): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
      const fromDate = formGroup.get(fromDateField).value;
      const toDate = formGroup.get(toDateField).value;
      // Ausing the fromDate and toDate are numbers. In not convert them first after null check
      if (fromDate !== '' && toDate !== '' && fromDate > toDate) {
        return { [errorName]: true };
      }
      return null;
    };
  }
}
