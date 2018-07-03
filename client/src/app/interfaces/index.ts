export interface ITransaction {
    id?: number;
    title: string;
    amount: number;
    date: number;
    user?: IUser;
    readableDate?: Date;
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
