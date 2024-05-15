import { postWithdraw } from "../../../src/models/withdraw";
import { accountExistService, createAccountService, resetAccountsService } from "../../../src/services/accountService";

describe('Withdraw test', () => {
    const accountNumber = '69';
    const initialAmount = 333;
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

    it('should make a withdraw in the account', () => {
        const account = accountExistService(accountNumber);
        expect(account).toBeDefined();
        expect(account!.id).toBe(accountNumber);
        expect(account!.balance).toBe(initialAmount);

        const withdraw = 111;
        const result = postWithdraw(account!, withdraw);
        expect(result).toBeDefined();
        expect(result!.id).toBe(accountNumber);
        expect(result!.balance).toBe(initialAmount - withdraw);
    })
})