import { resetAccountsService } from "../../../src/services/accountService";
import { postDepositService } from "../../../src/services/depositService";

describe('Deposit Service test', () => {
    const accountNumber = '1234';
    const accountAmount = 42;

    it('should reset the accounts database', () => {
        const result = resetAccountsService()
        expect(result).toBe(true);
    });

    it('should not create an account when deposit negative amount', () => {
        const negativeAccountNumber = '999';
        const negativeAccountAmount = -100;

        const result = postDepositService(negativeAccountNumber, negativeAccountAmount);
        expect(result).toBe(null);
    });

    it('should create an account when deposit', () => {
        const result = postDepositService(accountNumber, accountAmount);
        expect(result).toBeDefined();
        expect(result!.id).toBe(accountNumber);
        expect(result!.balance).toBe(accountAmount);
    });

    it('should deposit into an account you have already created', () => {
        const deposit = 100;
        const result = postDepositService(accountNumber, deposit);
        expect(result).toBeDefined();
        expect(result!.id).toBe(accountNumber);
        expect(result!.balance).toBe(accountAmount + deposit);
    });
})