import { postDeposit } from "../../../src/models/deposit";
import { accountExistService, createAccountService, resetAccountsService } from "../../../src/services/accountService";

describe('Deposit test', () => {
    const accountNumber = '666';
    const initialAmount = 42;
    it('should reset the accounts database', () => {
        const result = resetAccountsService()
        expect(result).toBe(true);
    });

    it('should create an account', () => {
        const result = createAccountService(accountNumber, initialAmount);
        expect(result).toBeDefined();
        expect(result!.id).toBe(accountNumber);
        expect(result!.balance).toBe(initialAmount);
    });

    it('should make a deposit in the account', () => {
        const account = accountExistService(accountNumber);
        expect(account).toBeDefined();
        expect(account!.id).toBe(accountNumber);
        expect(account!.balance).toBe(initialAmount);

        const deposit = 100;
        const result = postDeposit(account!, deposit);
        expect(result).toBeDefined();
        expect(result!.id).toBe(accountNumber);
        expect(result!.balance).toBe(initialAmount + deposit);
    })
})