import { AccountImpl } from "../interfaces/Account";
import { accountExist, createAccount } from './account';

const postDeposit = (destination: string, amount: number): AccountImpl | null => {
    try {
        const account = accountExist(destination);
        if(!account) {
            const newAccount: AccountImpl = createAccount(destination, amount);
            return newAccount;
        }

        account.balance = account.balance + amount;
        return account;
    } catch (error) {
        return null;
    }
    
}

export { postDeposit }
