import { accountExistService, createAccountService, resetAccountsService } from "../../../src/services/accountService";

describe('Accounts Service test', () => {
    const accountNumber = '1234';
    const accountAmount = 42;

    it('should reset the accounts database', () => {
        const result = resetAccountsService()
        expect(result).toBe(true);
    });
    
    it('should return null when checking if the account not yet created exists', () => {
        const result = accountExistService(accountNumber);
        expect(result).toBe(null);
    });

    it('should return null when create an account with negative amount', () => {
        const negativeAccountNumber = '999';
        const negativeAccountAmount = -100;
        const result = createAccountService(negativeAccountNumber, negativeAccountAmount);
        expect(result).toBe(null);
    });

    it('should create account', () => {
        const result = createAccountService(accountNumber, accountAmount);
        expect(result).toBeDefined();
        expect(result!.id).toBe(accountNumber);
        expect(result!.balance).toBe(accountAmount);
    });
})