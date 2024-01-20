import { AccountImpl } from "./Account";

export interface TransferTransaction {
    type: string,
    origin: string,
    amount: number,
    destination: string,
}

export interface TransferEvent {
    origin: AccountImpl,
    destination: AccountImpl
}