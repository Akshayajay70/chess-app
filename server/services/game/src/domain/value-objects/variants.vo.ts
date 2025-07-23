import { ValidationError } from "../errors/validation.error.ts";
import { variants, type VariantType } from "../entities/variant.entitie.ts";

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
