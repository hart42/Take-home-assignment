import { AccountImpl } from "../interfaces/Account";
import { accountExist, resetAccounts } from "../models/account";
import { Response } from "express";

const accountExistService = (account_id: string, res:Response): Response< AccountImpl > => {
    const account = accountExist(account_id);
    if(!account) {
        return res.status(404).json(0);
    }

    return res.status(200).json(account.balance);
}

const resetAccountsService = (res: Response): Response => {
    const cleaned = resetAccounts()
    if(!cleaned) {
        return res.status(404).json(0);
    }
    return res.status(200).send('OK');
}

export { accountExistService, resetAccountsService, }