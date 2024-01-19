import { Console } from "console";
import { AccountImpl } from "../interfaces/account";

let storedData: AccountImpl[] = [];

const getBalance = ():AccountImpl => {
    const account: AccountImpl = new AccountImpl(100, 42);

    storedData.push(account);
    
    return account;
}

const postReset = () => {
    storedData = [];
    return;
}

export { getBalance, postReset }