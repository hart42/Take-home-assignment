import { AccountImpl } from "../interfaces/Account";

let storedData: AccountImpl[] = [];

const accountExist = (account_id: string): AccountImpl | null => {
    const account = storedData.find(account => account.id === (account_id));
    if(!account) {
        return null;
    }

    return account;
}

const createAccount = (account_id: string, amount: number): AccountImpl => {
    const account = accountExist(account_id);
    if(!account) {
        const newAccount: AccountImpl = new AccountImpl(account_id, amount);
        storedData.push(newAccount);
        return newAccount;
    }

    return account;
}

const resetAccounts = (): Boolean =>  {
    storedData = [];
    return storedData.length > 0 ? false : true;
}

export { accountExist, createAccount, resetAccounts }