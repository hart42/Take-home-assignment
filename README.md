# Take-home-assignment

## **Endpoints**

### **Reset state before starting tests**

#### `POST` `/reset`

Reset all data.

-   **Request**  
    No route or query parameters.

-   **Response**  
    HTTP Status 200.  

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
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