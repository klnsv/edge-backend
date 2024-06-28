### [< BACK](../ReadMe.md)
## Orders Management API Documentation

### Overview

This API provides endpoints to manage orders, including retrieving order information. Each order includes delivery address, amount paid, mode of transaction, tracking ID, ordered time, net discount, net tax, and transaction IDs.

### Base URL

The base URL for all endpoints is: `http://localhost:3000`
## NOTE IMPORTANT 
### HEADER
Every http(s) request mentioned in this documentation page must have the following header structure in order to be deemed valid by the server. 
```json
    {
        "Authorization":"<jwt token>"
    }
```
The ```jwt token``` mentioned in the above case, will be obtained during authentication process.

## ENDPOINTS

#### 1. Get Orders Information

- **Method:** GET
- **URL:** `/orders`
- **Description:** Retrieves all orders' information.
- **Response:**
  - **Status Code:** 200 OK
  - **Body:**
    ```json
    [
      {
        "id": 1,
        "deliveryAddress": {
                              "state": "Illinois",
                              "district": "Cook",
                              "city": "Chicago",
                              "pincode": "60601",
                              "address_lane": "1213 Maple Street",
                              "landmark": "Near Millennium Park"
                            },
        "amount_paid": 150.75,
        "mode_of_transaction": "CARD",
        "tracking": "<link>",
        "ordered_time": "2024-06-25T12:34:56Z",
        "net_discount": 10.00,
        "net_tax": 5.25,
        "transaction_ids": [101, 102, 103],
        "product_ids":[12,56,786]
      },
      {
        "id": 2,
        "deliveryAddress": "456 Maple Ave, Anytown, USA",
        "amount_paid": 200.50,
        "mode_of_transaction": "UPI",
        "tracking": "<link>",
        "ordered_time": "2024-06-25T14:20:30Z",
        "net_discount": 15.00,
        "net_tax": 7.50,
        "transaction_ids": [104, 105, 106],
        "product_ids":[1432,576,76]
      
      }
    ]
    ```
- **cURL Example:**
  ```bash
  curl -X GET http://localhost:3000/orders
  ```

#### 2. Get Order by ID

- **Method:** GET
- **URL:** `/orders/:id`
- **Description:** Retrieves a single order's information by its ID.
- **Parameters:**
  - **id:** The ID of the order to retrieve.
- **Response:**
  - **Status Code:** 200 OK
  - **Body:**
    ```json
    {
      "id": 1,
      "deliveryAddress": {
                          "state": "Illinois",
                          "district": "Cook",
                          "city": "Chicago",
                          "pincode": "60601",
                          "address_lane": "1213 Maple Street",
                          "landmark": "Near Millennium Park"
                        },
      "amount_paid": 150.75,
      "mode_of_transaction": "CARD",
      "tracking": "<link>",
      "ordered_time": "2024-06-25T12:34:56Z",
      "net_discount": 10.00,
      "net_tax": 5.25,
      "transaction_ids": [101, 102, 103],
      "product_ids":[12,56,786]

      
    }
    ```
- **cURL Example:**
  ```bash
  curl -X GET http://localhost:3000/orders/1
  ```

### Notes

- Ensure that all required fields are filled in the request body for successful order creation.
- The PUT method allows partial updates; you only need to include the fields that you want to update.
- The DELETE endpoint will remove the order if it exists; otherwise, it will return a "order not found" message.

---