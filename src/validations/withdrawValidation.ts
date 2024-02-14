import { Request } from 'express';
import { WithdrawTransaction } from "../interfaces/Withdraw";

export const validateWithdrawTransaction = (req: Request): WithdrawTransaction => {
    let { type, origin, amount }: WithdrawTransaction =  req.body;

    if(typeof type !== 'string' || typeof origin !== 'string' || typeof amount !== 'number') {
        throw new Error('invalid data for this transaction');
    }

    if(type !== 'withdraw') {
        throw new Error('wrong transaction < withdraw >');
    }

    if(!Number.isInteger(amount) || amount < 1) {
        throw new Error('an integer greater than zero is required');
    }

    return { type, origin, amount };
}