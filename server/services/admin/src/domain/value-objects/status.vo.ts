import { ValidationError } from "../errors/validation.error";

export type AllowedStatus = 'active' | 'banned' | 'suspended';

export class Status {
    private readonly value: AllowedStatus;

    private constructor(status: AllowedStatus) {
        this.value = status;
    }

    public static create(status: string): Status {
        if (!this.isValid(status)) {
            throw new ValidationError(status, 'Invalid status: must be active, banned, or suspended');
        }
        return new Status(status as AllowedStatus);
    }

    public static isValid(status: string): boolean {
        return ['active', 'banned', 'suspended'].includes(status);
    }

    public getValue(): AllowedStatus {
        return this.value;
    }
}
