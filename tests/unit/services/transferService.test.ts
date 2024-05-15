import {accountExistService, createAccountService, resetAccountsService } from "../../../src/services/accountService";
import { postTransferService } from "../../../src/services/transferService";

describe('Transfer Service test', () => {
    const originAccount = '42';
    const destinationAccount = '69';
    const initialAmount = 100;

    it('should reset the accounts database', () => {
        const result = resetAccountsService()
        expect(result).toBe(true);
    });

    it('should return null when trying to withdraw from a non-existent account', () => {
        const result = postTransferService(originAccount, initialAmount, destinationAccount);
        expect(result).toBe(null);
    });

    it('should create origin account', () => {
        const result = createAccountService(originAccount, initialAmount);
        expect(result).toBeDefined();
        expect(result!.id).toBe(originAccount);
        expect(result!.balance).toBe(initialAmount);
    })

    it('should not withdraw more than the origin account balance when transfer', () => {
        const account = accountExistService(originAccount);
        expect(account).toBeDefined();
        expect(account!.id).toBe(originAccount);

        const transfer = account!.balance + 1;
        const result = postTransferService(originAccount, transfer, destinationAccount);
        expect(result).toBe(null);
    });

    it('should create an account when the transfer is made to a non-existent account', () => {
        const transfer = 50;
        const result = postTransferService(originAccount, transfer, destinationAccount);
        expect(result).toBeDefined();
        expect(result!.origin.id).toBe(originAccount);
        expect(result!.origin.balance).toBe(initialAmount - transfer);
        expect(result!.destination.id).toBe(destinationAccount);
        expect(result!.destination.balance).toBe(transfer);
    });

    it('should transfer between two accounts already created', () => {
        const createdOriginAccount = accountExistService(originAccount);
        expect(createdOriginAccount).toBeDefined();
        expect(createdOriginAccount!.id).toBe(originAccount);

        const createdDestinationAccount = accountExistService(destinationAccount);
        expect(createdDestinationAccount).toBeDefined();
        expect(createdDestinationAccount!.id).toBe(destinationAccount);

        const transfer = createdOriginAccount!.balance;
        const totalDestinationAmount = createdDestinationAccount!.balance + transfer;

        const result = postTransferService(createdOriginAccount!.id, transfer, createdDestinationAccount!.id);
        expect(result).toBeDefined();
        expect(result!.origin.id).toBe(createdOriginAccount!.id);
        expect(result!.origin.balance).toBe(0);
        expect(result!.destination.id).toBe(createdDestinationAccount!.id);
        expect(result!.destination.balance).toBe(totalDestinationAmount);
    });
})