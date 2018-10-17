import { RequiredFieldEmptyError } from "../common/errors";

export class TransactionForm {
    title: string;
    amount: number
    date: number;
    note: string;
    categoryId: string;
    constructor(requestBody) {
        this.title = requestBody.title;
        this.amount = requestBody.amount;
        this.date = requestBody.date;
        this.note = requestBody.note;
        this.categoryId = requestBody.categoryId;
    }
    validateTransaction() {
        if (!this.title) {
            throw new RequiredFieldEmptyError("title")
        }
        if (!this.amount) {
            throw new RequiredFieldEmptyError("amount")
        }
        if (!this.date) {
            throw new RequiredFieldEmptyError("date")
        }
        if (!this.categoryId) {
            throw new RequiredFieldEmptyError("categoryId");
        }
    }
}