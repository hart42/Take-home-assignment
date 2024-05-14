import { createAccount } from "../../src/models/account";
import { postDeposit } from "../../src/controllers/deposit";

describe('Deposit tests', () => {
    const accountNumber = '1234';
    const accountAmount = 42;
    it('should create an account', () => {
        const result = createAccount(accountNumber, accountAmount);
        expect(result).toBeDefined();
        expect(result.id).toBe("1234");
        expect(result.balance).toBe(42);
    });

    it('should deposit in the account', () => {
        const deposit = 100;
        const finalAmount = deposit + accountAmount;
        const result = postDeposit(accountNumber, deposit);
        expect(result).toBeDefined();
        expect(result!.id).toBe(accountNumber);
        expect(result!.balance).toBe(finalAmount);
    });

    it('should create a new account with the deposit', () => {
        const newAccountNumber = '007';
        const newAccountAmount = 10000;
        const result = postDeposit(newAccountNumber, newAccountAmount);
        expect(result).toBeDefined();
        expect(result!.id).toBe(newAccountNumber);
        expect(result!.balance).toBe(newAccountAmount);
    });

    it('should not create a new account with negative deposit', () => {
        const newAccountNumber = '01';
        const newAccountAmount = -10000;
        const result = postDeposit(newAccountNumber, newAccountAmount);
        console.log(result);
        expect(result).toBeDefined();
        expect(result!.id).toBe(newAccountNumber);
        expect(result!.balance).toBe(newAccountAmount);
    });
})