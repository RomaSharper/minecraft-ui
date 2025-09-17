// Form validation utilities

export interface ValidationRule {
    test: (value: any) => boolean;
    message: string;
}

export class Validator {
    private rules: ValidationRule[] = [];

    public addRule(rule: ValidationRule): this {
        this.rules.push(rule);
        return this;
    }

    public validate(value: any): { isValid: boolean; errors: string[] } {
        const errors: string[] = [];

        for (const rule of this.rules) {
            if (!rule.test(value)) {
                errors.push(rule.message);
            }
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    public static required(message = 'This field is required'): ValidationRule {
        return {
            test: (value: any) => value !== null && value !== undefined && value !== '',
            message
        };
    }

    public static minLength(min: number, message?: string): ValidationRule {
        return {
            message: message || `Must be at least ${min} characters long`,
            test: value => value && typeof(value) === 'string' && value.length >= min
        };
    }

    public static maxLength(max: number, message?: string): ValidationRule {
        return {
            test: (value: string) => !value || value.length <= max,
            message: message || `Must be no more than ${max} characters long`
        };
    }

    public static pattern(regex: RegExp, message = 'Invalid format'): ValidationRule {
        return {
            test: (value: string) => !value || regex.test(value),
            message
        };
    }

    public static email(message = 'Invalid email address'): ValidationRule {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return {
            test: (value: string) => !value || emailRegex.test(value),
            message
        };
    }

    public static numeric(message = 'Must be a number'): ValidationRule {
        return {
            test: (value: any) => !value || !isNaN(Number(value)),
            message
        };
    }
}