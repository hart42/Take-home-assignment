import { Request } from 'express';
import { TransferTransaction } from '../interfaces/Transfer';

export const validateTransferTransaction = (req: Request): TransferTransaction => {
    let { type, origin, amount, destination }: TransferTransaction = req.body;

    if(typeof type !== 'string' || typeof origin !== 'string' || typeof destination !== 'string' || typeof amount !== 'number'){
        throw new Error('invalid data for this transaction');
    }

    if(!Number.isInteger(amount) || amount < 1) {
        throw new Error('an integer greater than zero is required');
    }

    return { type, origin, amount, destination };
}