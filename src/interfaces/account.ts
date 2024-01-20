interface Account {
    id: string,
    balance: number
}

export class AccountImpl implements Account {
    constructor(id: string, balance: number) {
        this.id = id,
        this.balance = balance
    }

    id: string;
    balance: number;
}