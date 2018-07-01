export interface Transaction {
    id: number;
    title: string;
    amount: number;
    user: User;
}
export interface User {
    name: string;
    username: string;
    password: string;
    id: number;
}
