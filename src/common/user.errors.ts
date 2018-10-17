import { AppError } from "./errors";

export class InvalidCredentialsError implements AppError {
    status = 400;
    message = "Incorrect username or password"
}

export class UserExistsError implements AppError {
    message = "User already exists"
    status = 400;
}

export class UserNotFoundError implements AppError {
    message: string;
    status = 404;
    constructor(field: string, value: string) {
        this.message = `User with [${field}] '${value}' was not found`
    }
}