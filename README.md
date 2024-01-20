# Take-home-assignment

### How to Run Locally
 **Follow the steps below to run the application locally on your machine.**

#### Requirements:
- Node.js installed on your machine.
- npm (usually installed with Node.js).
- Git to clone the repository (optional).

#### Installation
- Download and extract the ZIP from the repository
or **Clone** this repository: 
```
git clone https://github.com/hart42/Take-home-assignment
```

- Install the dependencies:
```
npm install
```

#### Execution
- Run the application with the following command:
```
npm run dev
```

## **Endpoints**

### **Reset state before starting tests**

#### `POST` `/reset`

Reset all data.

-   **Request**  
    No route or query parameters.

-   **Response**  
    HTTP Status 200.  

#### **Examples of responses**

```javascript
// HTTP Status 200 OK
// No route or query parameters
```

### **Get balance**

#### `GET` `/balance?account_id=1234`

Returns the account's balance.

-   **Request**  
    Use the query parameter `account_id`.  
    There should be no content in the body of the requisition

-   **Response**  
    In the **success** case, it should return HTTP Status 200 and the value of the account balance.
    balance is an integer representing the value in **cents**
    In case of **failure**, it should return HTTP Status 404 and the value 0. 

#### **Request example**
```javascript
// GET /balance?account_id=1234
// No content in the body of the requisition
```

#### **Example of response**

```javascript
// Get balance for existing account | HTTP Status 200  
{
    10
}
```
```javascript
// Get balance for non-existing account | HTTP Status 404
{
    0
}
```
### **Create account with initial balance**

#### `POST` `/event`

Create account with initial balance.

-   **Request**  
    The body must have an object with the following properties (respecting these names):
    - "type": "deposit", (string)
    - "destination": "100", (string)
    - "amount": 10 (number)
    - amount is an integer representing the value in **cents**

-   **Response**  
    If **successful**, returns HTTP Status 201 and a json in the body in the format:{"destination": {"id":"100","balance":20}}  

#### **Examples of responses**

```javascript
// HTTP Status 201
    {"destination": {"id":"100","balance":20}}
```
### **Deposit into existing account**

#### `POST` `/event`

Deposits a new amount into an existing account.

-   **Request**  
    The body must have an object with the following properties (respecting these names):
    - "type": "deposit", (string)
    - "destination": "100", (string)
    - "amount": 10 (number)
    - destination must be the value of a valid account_id;
    - amount is an integer representing the value in **cents**


-   **Response**  
    - If **successful**, returns HTTP Status 201 and a json in the body in the format:{"destination": {"id":"100","balance":20}}
    - **returns the account with the new value already added**

#### **Examples of responses**

```javascript
// HTTP Status 201
    {"destination": {"id":"100","balance":20}}
```

### **Withdraw from existing account**

#### `POST` `/event`

Withdrawal of amount from existing account.

-   **Request**  
    The body must have an object with the following properties (respecting these names):
    - "type": "withdraw", (string)
    - "origin": "100", (string)
    - "amount": 10 (number)
    - origin must be the value of a valid account_id;
    - amount is an integer representing the value in **cents**


-   **Response**  
    - If **successful**, returns HTTP Status 201 and a json in the body in the format:{"destination": {"id":"100","balance":20}}
    - **returns the account with the new value already added**
    - In case of **failure**, it should return HTTP Status 404 and the value 0. 

#### **Examples of responses**

```javascript
// HTTP Status 201
    {"origin": {"id":"100","balance":10}}
```
```javascript
// Withdraw from a non-existing account | HTTP Status 404
{
    0
}
```
### **Transfer from existing account**

#### `POST` `/event`

Transfer the value between the source account and the target account.

-   **Request**  
    The body must have an object with the following properties (respecting these names):
    - "type": "transfer", (string)
    - "origin": "100", (string)
    - "amount": 10 (number)
    - "destination": "42" (string)

    - origin must be the value of a **valid** account_id;
    - amount is an integer representing the value in **cents**
    - If the destination account does not exist, a new account will be created with the amount transferred from the source account


-   **Response**  
    - If **successful**, returns the origin account and the destination account with their respective updated balances in a response HTTP Status 201 and a json in the body in the format: {"origin": {"id":"100", "balance":0}, "destination": {"id":"300", "balance":15}}

    - **returns the account with the new value already added**
    - In case of **failure**, it should return HTTP Status 404 and the value 0. 

#### **Examples of responses**

```javascript
// HTTP Status 201
    {   
        "origin": {"id":"100", "balance":0}, 
        "destination": {"id":"300", "balance":15}
    }
```
```javascript
// Transfer from non-existing account | HTTP Status 404
{
    0
}
```