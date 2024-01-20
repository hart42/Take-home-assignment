import { AccountImpl } from "../interfaces/Account";
import { Request, Response } from 'express';
import { validateDepositTransaction } from '../validations/depositValidation';
import { DepositTransaction } from "../interfaces/Deposit";

let storedData: AccountImpl[] = [];

const getBalance = (req: Request, res: Response): Response< AccountImpl > => {
    const { account_id } = req.query;
    if(!account_id || typeof account_id !== 'string') {
        return res.status(404).json(0);
    }

    const account = accountExist(account_id);
    if(!account) {
        return res.status(404).json(0);
    }
    
    return res.status(200).json(account.balance);
}

const postReset = (req: Request, res: Response): Response =>  {
    console.log('Reset');
    storedData = [];
    return res.status(200).json();
}

const postDeposit = (req: Request, res: Response): Response< AccountImpl > => {
    try {
        const { type, destination, amount }: DepositTransaction = validateDepositTransaction(req);
        
        const account = accountExist(destination);
        if(!account) {
            const newAccount: AccountImpl = new AccountImpl(destination, amount);
            storedData.push(newAccount);
            return res.status(201).json({
                'destination' : newAccount
            });
        }

        account.balance = account.balance + amount;
        return res.status(201).json({
            'destination' : account
        });
    } catch (error) {
        return res.status(404).json(0);
    }
    
}

const accountExist = (account_id: string): AccountImpl | null => {
    const account = storedData.find(account => account.id === (account_id));
    if(!account) {
        return null;
    }

    return account;
}

export { getBalance, postReset, postDeposit}