import { Request, Response } from 'express';
import { AccountImpl } from "../interfaces/Account";
import { DepositTransaction } from "../interfaces/Deposit";
import { WithdrawTransaction } from "../interfaces/Withdraw";
import { TransferTransaction } from "../interfaces/Transfer";
import { validateDepositTransaction } from '../validations/depositValidation';
import { validateWithdrawTransaction } from "../validations/withdrawValidation";
import { validateTransferTransaction } from "../validations/transferValidation";
import { accountExist, createAccount, resetAccounts } from "./account";
import { postDeposit } from "./deposit";
import { postWithdraw } from "./withdraw";

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
    const cleaned = resetAccounts();
    if(!cleaned) {
        return res.status(404).json(0);
    }
    return res.status(200).send('OK');
}

const events = (req: Request, res: Response): Response < AccountImpl > => {
    const { type } = req.body;
    if(!type) {
        return res.status(404).json(0);
    }

    switch (type) {
        case 'deposit':
            const depositValidated: DepositTransaction = validateDepositTransaction(req);
            const depositAccount = postDeposit(depositValidated.destination, depositValidated.amount);
            if(!depositAccount) {
                break;
            }
            return res.status(201).json({
                'destination' : depositAccount
            });
        
        case 'withdraw':
            const withdrawValidated: WithdrawTransaction = validateWithdrawTransaction(req);
            const withdrawAccount = postWithdraw(withdrawValidated.origin, withdrawValidated.amount);
            if(!withdrawAccount) {
                break;
            }
            return res.status(201).json({
                'origin' : withdrawAccount
            });

        case 'transfer':
            postTransfer(req, res);
            break;
        default:
            res.status(404).json(0)
            break;
    }

    return res.status(404).json(0);
}

const postTransfer = (req: Request, res: Response): Response < AccountImpl > => {
    try {
        const { type, origin, amount, destination }: TransferTransaction = validateTransferTransaction(req);
        
        const originAccount = accountExist(origin);
        if(!originAccount) {
            return res.status(404).json(0);
        }
        if(originAccount.balance < amount) {
            return res.status(403).json(0);
        }
        originAccount.balance = originAccount.balance - amount;
        
        const destinationAccount = accountExist(destination);
        if(!destinationAccount) {
            const newAccount: AccountImpl = createAccount(destination, amount);
            return res.status(201).json({
                'origin' : originAccount,
                'destination' : newAccount
            });
        }
        
        destinationAccount.balance = destinationAccount.balance + amount;
        
        return res.status(201).json({
            'origin' : originAccount,
            'destination' : destinationAccount
        });
    } catch (error) {
        return res.status(404).json(0);
    }
}

export { getBalance, postReset, events, postWithdraw, postTransfer }
