export interface AppError {
    message: string;
}
export class RequiredFieldEmptyError implements AppError {
    field: string;
    message: string;
    constructor(field: string) {
        this.field = field;
        this.message = `Field [${this.field}] is required`
    }
}