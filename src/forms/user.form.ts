import { RequiredFieldEmptyError } from "../common/errors";

export class UserForm {
    username: string;
    name: string;
    password: string;
    constructor(requestBody) {
        this.username = requestBody.username;
        this.name = requestBody.name;
        this.password = requestBody.password;
    }

    private validateUsername() {
        if (!this.username) {
            throw new RequiredFieldEmptyError("username")
        }
    }

    private validateName() {
        if (!this.name) {
            throw new RequiredFieldEmptyError("name")
        }
    }
    private validatePassword() {
        if (!this.password) {
            throw new RequiredFieldEmptyError("password")
        }
    }

    validateExistingUserForLogin() {
        this.validateUsername();
        this.validatePassword();
    }

    validateNewUser() {
        this.validateUsername();
        this.validatePassword();
        this.validateName();
    }

}