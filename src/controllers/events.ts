import { Request, Response } from 'express';
import { AccountImpl } from "../interfaces/Account";
import { DepositTransaction } from "../interfaces/Deposit";
import { WithdrawTransaction } from "../interfaces/Withdraw";
import { TransferTransaction } from "../interfaces/Transfer";
import { validateDepositTransaction } from '../validations/depositValidation';
import { validateWithdrawTransaction } from "../validations/withdrawValidation";
import { validateTransferTransaction } from "../validations/transferValidation";
import { accountExistService, resetAccountsService } from '../services/accountService';
import { postDepositService } from '../services/depositService';
import { postTransferService } from '../services/transferService';
import { postWithdrawService } from '../services/withdrawService';

const getBalance = (req: Request, res: Response): Response< AccountImpl > => {
    const { account_id } = req.query;
    if(!account_id || typeof account_id !== 'string') {
        return res.status(404).json(0);
    }

    const account = accountExistService(account_id);
    if(!account) {
        return res.status(404).json(0);
    }
    return res.status(200).json(account!.balance);
}

const postReset = (req: Request, res: Response): Response =>  {
    const cleaned = resetAccountsService();
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
            const depositAccount =  postDepositService(depositValidated.destination, depositValidated.amount);
            if(!depositAccount) {
                break;
            }
            return res.status(201).json({ 'destination' : depositAccount });
        
        case 'withdraw':
            const withdrawValidated: WithdrawTransaction = validateWithdrawTransaction(req);
            const withdrawAccount = postWithdrawService(withdrawValidated.origin, withdrawValidated.amount);
            if(!withdrawAccount) {
                break;
            }
            return res.status(201).json({ 'origin' : withdrawAccount });

        case 'transfer':
            const transferValidated: TransferTransaction = validateTransferTransaction(req);
            const transferAccounts = postTransferService(transferValidated.origin, transferValidated.amount, transferValidated.destination);
            if(!transferAccounts) {
                break;
            }
            return res.status(201).json({
                'origin' : transferAccounts.origin,
                'destination' : transferAccounts.destination
            });
        default:
            return res.status(404).json(0);
            break;
    }

    return res.status(404).json(0);
}

export { getBalance, postReset, events }
