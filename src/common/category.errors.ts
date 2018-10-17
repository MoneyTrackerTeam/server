import { AppError } from "./errors";

export class CategoryAlreadyExistsError implements AppError {
    message = "Category with this name already exists"
    status = 400;
}


export class CategoryNotFound implements AppError {
    message: string;
    status = 404;
    constructor(field: string, value: string) {
        this.message = `Category with [${field}] '${value}' was not found`
    }
}