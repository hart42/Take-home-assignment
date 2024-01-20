import { Request } from 'express';
import { DepositTransaction } from "../interfaces/Deposit";


export const validateDepositTransaction = (req: Request): DepositTransaction => {
    let { type, destination, amount }: DepositTransaction = req.body;

    if(typeof type !== 'string' || typeof destination !== 'string' || typeof amount !== 'number'){
        throw new Error('invalid data for this transaction');
    }

    if(!Number.isInteger(amount) || amount < 1) {
        throw new Error('an integer greater than zero is required');
    }

    return { type, destination, amount };
}