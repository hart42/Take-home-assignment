import { AccountImpl } from "../interfaces/Account";

const postWithdraw = (account: AccountImpl, amount: number): AccountImpl => {
    account.balance = account.balance - amount;
    return account;
}

export { postWithdraw }
