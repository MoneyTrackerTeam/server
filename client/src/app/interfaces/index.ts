export interface ITransaction {
    id?: number;
    title: string;
    amount: number;
    date: number;
    user?: IUser;
}
export interface IUser {
    name: string;
    username: string;
    password: string;
    id: number;
}

export interface IError {
    severity: 'error' | 'warning' | 'info';
    text: string;
}
