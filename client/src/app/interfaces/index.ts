export interface ITransaction {
    id?: number;
    title: string;
    amount: number;
    date: number;
    user?: IUser;
    readableDate?: String;
    readableTime?: String;
    categoryId?: string | number;
    category?: ICategory;
}

export interface IMonth {
    id: number;
    title: string;
    budget: number;
    spent: number;
    monthNumber: number;
    year: number;
    transactions: ITransaction[];
}
export interface IUser {
    name: string;
    username: string;
    password: string;
    id: number;
}

export interface IError {
    severity: 'danger' | 'warning' | 'info' | 'success';
    text: string;
    module: string;
}

export interface ICategory {
    id: number;
    name?: string;
    trnsactions?: ITransaction[];
}
