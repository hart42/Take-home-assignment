import { TransferEvent } from "../interfaces/Transfer";
import { AccountImpl } from "../interfaces/Account";

const postTransfer = (origin: AccountImpl, destination: AccountImpl): TransferEvent => {
    return {
        'origin' : origin, 
        'destination': destination
    };
}

export { postTransfer }
