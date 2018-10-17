import { AppError } from "./errors";

export class InvalidCredentialsError implements AppError {
    message = "Incorrect username or password"
}