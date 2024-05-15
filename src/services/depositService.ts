import { AccountImpl } from "../interfaces/Account";
import { postDeposit } from "../models/deposit";
import { accountExistService, createAccountService } from "./accountService";

const postDepositService = (destination: string, amount: number): AccountImpl | null => {
    const account = accountExistService(destination);
    if(!account) {
        const newAccount = createAccountService(destination, amount);
        return newAccount;
    }
    const deposit: AccountImpl = postDeposit(account, amount);
    return deposit;
}

export { postDepositService }