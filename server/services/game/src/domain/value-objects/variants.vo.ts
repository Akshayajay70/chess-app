import { ValidationError } from "../errors/validation.error";

export const variants = [
    'bullet(1+0)',
    'bullet(1+2)',
    'blitz(3+0)',
    'blitz(3+2)',
    'rapid(10+0)',
    'rapid(10+5)',
    'classic(60+30)',
    'classic(90+30)'
] as const;

export type VariantType = typeof variants[number];

export class Variant {
    private constructor(private readonly value: VariantType) { }

    public static create(value: string): Variant {
        if (!this.isValid(value)) {
            throw new ValidationError(value, 'Invalid Variant');
        }
        return new Variant(value as VariantType);
    }

    public getValue(): VariantType {
        return this.value;
    }

    private static isValid(value: string): value is VariantType {
        return (variants as readonly string[]).includes(value);
    }
}
