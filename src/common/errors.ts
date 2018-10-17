export interface AppError {
    message: string;
    status: number;
}
export class RequiredFieldEmptyError implements AppError {
    field: string;
    message: string;
    status: number
    constructor(field: string) {
        this.field = field;
        this.message = `Field [${this.field}] is required`
        this.status = 400;
    }
}

export class GenericError extends Error implements AppError {
    status = 500;
}