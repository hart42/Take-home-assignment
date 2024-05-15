import { AccountImpl } from "../interfaces/Account";
import { postWithdraw } from "../models/withdraw";
import { accountExistService } from "./accountService";

const postWithdrawService = (origin: string, amount: number): AccountImpl | null => {
    const account = accountExistService(origin);
    if(!account) {
        return null;
    }
    if(account.balance < amount) {
        return null;
    }

    const withdraw = postWithdraw(account, amount);
    return withdraw;
    
}

export { postWithdrawService }