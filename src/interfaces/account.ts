interface Account {
    id: number,
    balance: number
}

export class AccountImpl implements Account {
    constructor(id: number, balance: number) {
        this.id = id,
        this.balance = balance
    }

    id: number;
    balance: number;
}