import { AccountImpl } from "../interfaces/Account";

const postDeposit = (account: AccountImpl, amount: number): AccountImpl => {

    account.balance = account.balance + amount;
    return account;
}

export { postDeposit }
