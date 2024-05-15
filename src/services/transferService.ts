import { postDepositService } from "./depositService";
import { TransferEvent } from "../interfaces/Transfer";
import { postTransfer } from "../models/transfer";
import { postWithdrawService } from "./withdrawService";

const postTransferService = (origin: string, amount: number, destination: string): TransferEvent | null => {
    const transferOrigin = postWithdrawService(origin, amount);
    if(!transferOrigin) {
        return null;
    }
    const transferDestination = postDepositService(destination, amount);
    if(!transferDestination) {
        return null;
    }

    const transfer = postTransfer(transferOrigin, transferDestination);
    return transfer;

}

export { postTransferService }