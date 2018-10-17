import { RequiredFieldEmptyError } from "../common/errors";

export class CategoryForm {
    name: string;
    constructor(requestBody) {

        this.name = requestBody.name;

    }
    private validateName() {
        if (!this.name) {
            throw new RequiredFieldEmptyError("name")
        }
    }
    validate(): any {
        this.validateName()
    }
}