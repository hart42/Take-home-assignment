import { Response } from "express"
import { accountExist, createAccount } from "../models/account"
import { AccountImpl } from "../interfaces/Account";
import { postDeposit } from "../models/deposit";

const postDepositService = (destination: string, amount: number, res: Response): Response <AccountImpl> => {
    const account = accountExist(destination);
    if(!account) {
        const newAccount: AccountImpl = createAccount(destination, amount);
        return res.status(201).json({
            'destination' : newAccount.id
        });
    }
    const deposit = postDeposit(account, amount);
    return res.status(201).json({
        'destination' : deposit.id
    });
}

export { postDepositService }