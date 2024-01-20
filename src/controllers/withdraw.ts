import { AccountImpl } from "../interfaces/Account";
import { accountExist } from "./account";

const postWithdraw = (origin: string, amount: number): AccountImpl | null => {
    try {
        const account = accountExist(origin);
        if(!account) {
            return null;
        }
        if(account.balance < amount) {
            return null;
        }
        
        account.balance = account.balance - amount;
        return account;
    } catch (error) {
        return null;
    }
}

export { postWithdraw }
