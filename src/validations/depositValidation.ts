import { Request } from 'express';
import { DepositTransaction } from "../interfaces/Deposit";


export const validateDepositTransaction = (req: Request): DepositTransaction => {
    let { type, destination, amount }: DepositTransaction = req.body;

    if(typeof type !== 'string' || typeof destination !== 'string' || typeof amount !== 'number'){
        throw new Error('invalid data for this transaction');
    }
    amount = Number(amount);
    if(amount < 0) {
        throw new Error('a value greater than zero is required');
    }

    return { type, destination, amount };
}