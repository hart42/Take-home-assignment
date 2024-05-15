import { AccountImpl } from "../interfaces/Account";
import { accountExist, createAccount, resetAccounts } from "../models/account";

const accountExistService = (account_id: string): AccountImpl | null => {
    const account = accountExist(account_id);
    if(!account) {
        return null;
    }
    return account;
}

const createAccountService = (account_id: string, amount: number): AccountImpl | null => {
    const account = accountExist(account_id);
    if(!account) {
        if(amount > 1) {
            const newAccount = createAccount(account_id, amount);
            return newAccount;
        }
        return null;
    }

    return account;
}

const resetAccountsService = (): boolean => {
    const cleaned = resetAccounts()
    if(!cleaned) {
        return false;
    }
    return true;
}

export { accountExistService, resetAccountsService, createAccountService }