import { accountExist, resetAccounts, createAccount } from "../../../src/models/account";

describe('Accounts tests', () => {
    const accountNumber = '1234'
    const accountAmount = 42
    it('should reset the accounts database', () => {
        const result = resetAccounts()
        expect(result).toBe(true);
    });

    it('should not return any accounts', () => {
        const result = accountExist(accountNumber)
        expect(result).toBe(null);
    });
    
    it('should create an account', () => {
        const result = createAccount(accountNumber, accountAmount);
        expect(result).toBeDefined();
        expect(result.id).toBe(accountNumber);
        expect(result.balance).toBe(accountAmount);
    });
    
    it('should return the account that was just created', () => {
        const result = accountExist(accountNumber);
        expect(result).toBeDefined();
        expect(result!.id).toBe(accountNumber);
        expect(result!.balance).toBe(accountAmount);
    });

})