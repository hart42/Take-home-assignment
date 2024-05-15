import { postTransfer } from "../../../src/models/transfer";
import { postWithdraw } from "../../../src/models/withdraw";
import { accountExistService, createAccountService, resetAccountsService } from "../../../src/services/accountService";
import { postDepositService } from "../../../src/services/depositService";
import { postWithdrawService } from "../../../src/services/withdrawService";

describe('Transfer test', () => {
    const originAccount = '42';
    const destinationAccount = '69';
    const initialAmount = 100;
    it('should reset the accounts database', () => {
        const result = resetAccountsService()
        expect(result).toBe(true);
    });

    it('should create two accounts', () => {
        const origin = createAccountService(originAccount, initialAmount);
        expect(origin).toBeDefined();
        expect(origin!.id).toBe(originAccount);
        expect(origin!.balance).toBe(initialAmount);

        const destination = createAccountService(destinationAccount, initialAmount);
        expect(destination).toBeDefined();
        expect(destination!.id).toBe(destinationAccount);
        expect(destination!.balance).toBe(initialAmount);
    });

    it('should make a transfer between the accounts', () => {
        const transferAmount = 50;
        
        const withdraw = postWithdrawService(originAccount, transferAmount);
        expect(withdraw).toBeDefined();
        expect(withdraw!.id).toBe(originAccount);
        expect(withdraw!.balance).toBe(initialAmount - transferAmount);

        const deposit = postDepositService(destinationAccount, transferAmount);
        expect(deposit).toBeDefined();
        expect(deposit!.id).toBe(destinationAccount);
        expect(deposit!.balance).toBe(initialAmount + transferAmount);

        const result = postTransfer(withdraw!, deposit!);
        expect(result).toBeDefined();
        expect(result.origin).toBe(withdraw);
        expect(result.origin.balance).toBe(initialAmount - transferAmount);
        expect(result.destination).toBe(deposit);
        expect(result.destination.balance).toBe(initialAmount + transferAmount);
    })
})