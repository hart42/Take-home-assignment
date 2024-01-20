# Take-home-assignment

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
