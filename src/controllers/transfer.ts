import { postWithdraw } from "./withdraw";
import { postDeposit } from "./deposit";
import { TransferEvent } from "../interfaces/Transfer";

const postTransfer = (origin: string, amount: number, destination: string): TransferEvent | null => {
    try {
        const originAccount = postWithdraw(origin, amount);
        if(!originAccount) {
            return null;
        }
        const destinationAccount = postDeposit(destination, amount);
        if(!destinationAccount) {
            return null;
        }
        return {
            'origin' : originAccount, 
            'destination': destinationAccount
        };
    } catch (error) {
        return null;
    }
}

export { postTransfer }
