import {accountExistService, createAccountService, resetAccountsService } from "../../../src/services/accountService";
import { postWithdrawService } from "../../../src/services/withdrawService";

describe('Withdraw Service test', () => {
    const accountNumber = '1234';
    const accountAmount = 42;

    it('should reset the accounts database', () => {
        const result = resetAccountsService()
        expect(result).toBe(true);
    });

    it('should not create an account when withdraw from an inexistent account', () => {
        const result = postWithdrawService(accountNumber, accountAmount);
        expect(result).toBe(null);
    });

    it('should create an account', () => {
        const result = createAccountService(accountNumber, accountAmount);
        expect(result).toBeDefined();
        expect(result!.id).toBe(accountNumber);
        expect(result!.balance).toBe(accountAmount);
    });

    it('should not withdraw more than the account balance', () => {
        const withdraw = 100;
        const result = postWithdrawService(accountNumber, withdraw);
        expect(result).toBe(null);
    });

    it('should withdraw from account', () => {
        const withdraw = 22;
        const result = postWithdrawService(accountNumber, withdraw);
        expect(result).toBeDefined();
        expect(result!.id).toBe(accountNumber);
        expect(result!.balance).toBe(accountAmount - withdraw);
    });

    it('should let the account with 0 of balance', () => {
        const account = accountExistService(accountNumber);
        expect(account).toBeDefined();
        expect(account!.id).toBe(accountNumber);

        const withdraw = account?.balance;
        const result = postWithdrawService(accountNumber, withdraw!);
        expect(result).toBeDefined();
        expect(result!.id).toBe(accountNumber);
        expect(result!.balance).toBe(0);
    });
})