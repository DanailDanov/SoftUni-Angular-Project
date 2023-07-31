import { ValidatorFn } from "@angular/forms";

export function emailValidator(domains: string[]): ValidatorFn {

    const domainStrings = domains.join('|');
    const regExp = new RegExp(`[^@]+@[^@]+\.(${domainStrings})$`);

    return (control) => {
        if (control.value === '' || regExp.test(control.value)) {
            return null;
        }
        return { emailValidator: true };
    };
}