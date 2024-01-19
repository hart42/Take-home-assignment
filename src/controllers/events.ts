import { AccountImpl } from "../interfaces/account";
import { Request, Response, response } from 'express';

let storedData: AccountImpl[] = [];

const getBalance = (req: Request, res: Response): Response< AccountImpl > => {
    const { account_id } = req.query;
    if(!account_id) {
        return res.status(404).json(0);
    }

    const account = accountExist(Number(account_id));
    if(!account) {
        return res.status(404).json(0);
    }
    
    return res.status(200).json(account.balance);
}

const postReset = (req: Request, res: Response): Response =>  {
    storedData = [];
    return res.status(200);
}

const accountExist = (account_id: number): AccountImpl | null => {
    const account = storedData.find(account => account.id === (account_id));
    if(!account) {
        return null;
    }

    return account;
}

export { getBalance, postReset }