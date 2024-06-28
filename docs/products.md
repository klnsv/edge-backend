### [< BACK](../ReadMe.md)
## Products Management API Documentation

### Overview

This API provides endpoints to manage product data, including retrieving, creating, updating, and deleting product information. The information includes product name, price, discount, quantity, description, images, and parameters.

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

#### 1. Get Products Information

- **Method:** GET
- **URL:** `/products`
- **description:** Retrieves product information.
- **Response:**
  - **Status Code:** 200 OK
  - **Body:**
    ```json
    [
      {
        "id":"number",
        "name": "string",
        "price": "number",
        "discount": "number",
        "quantity": "number",
        "description": "string",
        "images": ["link 1", "link 2", ...],
        "parameters": [
          {
            "name": "name of property",
            "value":"value for property",
            "price": "number"
          }
        ]
      },
      ...
    ]
    ```
- **cURL Example:**
  ```bash
  curl -X GET http://localhost:3000/products
  ```

#### 2. Get Information of specific product

- **Method:** GET
- **URL:** `/products/:id`
- **description:** Retrieves product information.
- **Response:**
  - **Status Code:** 200 OK
  - **Body:**
    ```json
    {
    "id":"number",
    "name": "string",
    "price": "number",
    "discount": "number",
    "quantity": "number",
    "description": "string",
    "images": ["link 1", "link 2", ...],
    "parameters": [
            {
            "name": "name of property",
            "value":"value for property",
            "price": "number"
          }
        ]
    }
    ```
- **cURL Example:**
  ```bash
  curl -X GET http://localhost:3000/products
  ```

#### 3. Create New Product

- **Method:** POST
- **URL:** `/products:id`
- **description:** Creates a new product with the provided information.
- **Request Body:**
  ```json
  {
    "name": "string",
    "price": "number",
    "discount": "number",
    "quantity": "number",
    "description": "string",
    "images": ["link 1", "link 2", ...],
    "parameters": [
      {
            "name": "name of property",
            "value":"value for property",
            "price": "number"
          }
    ]
  }
  ```
- **Response:**
  - **Status Code:** 201 Created
  - **Body:**
    ```json
    {
      "message": "Product created successfully"
    }
    ```
- **cURL Example:**
  ```bash
  curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Elysian Dawn",
    "price": 7400.0,
    "discount": 5.0,
    "quantity": 100,
    "description": "Introducing "Elysian Dawn" – a captivating blend of fresh bergamot, enchanting jasmine, and warm sandalwood. This exquisite fragrance evokes the serenity of early morning light, leaving a lasting impression. Perfect for any occasion, Elysian Dawn promises to elevate your senses and envelop you in timeless elegance.",
    "images": ["http://example.com/image1.jpg", "http://example.com/image2.jpg"],
    "parameters": [
      {
            "name": "volume",
            "value":"50ml",
            "price": 7400
          },
      {
            "name": "volume",
            "value":"100ml",
            "price": 14800
          }
    ]
  }'
  ```

#### 4. Update Product Information

- **Method:** PUT
- **URL:** `/products:id`
- **description:** Updates product information. Only the fields that need to be updated should be included in the request body.
- **Request Body:** (Example with optional fields)
  ```json
  {
    "name": "string",
    "price": "number",
    "discount": "number",
    "quantity": "number",
    "description": "string",
    "images": ["link 1", "link 2", ...],
    "parameters": [
      {
            "name": "name of property",
            "value":"value for property",
            "price": "number"
          }
    ]
  }
  ```
- **Response:**
  - **Status Code:** 200 OK
  - **Body:**
    - If update is successful:
      ```json
      {
        "message": "updated"
      }
      ```
    - If update fails:
      ```json
      {
        "message": "failed to update"
      }
      ```
    - If no input is given:
      ```json
      {
        "message": "nothing to update"
      }
      ```
- **cURL Example:**
  ```bash
  curl -X PUT http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{
    "price": 5500.0,
    "quantity": 120
  }'
  ```

#### 5. Delete Product

- **Method:** DELETE
- **URL:** `/products:id`
- **description:** Deletes the product.
- **Response:**
  - **Status Code:** 200 OK
  - **Body:**
    - If deletion is successful:
      ```json
      {
        "message": "deleted"
      }
      ```
    - If deletion fails:
      ```json
      {
        "message": "failed to delete"
      }
      ```
    - If product is not found:
      ```json
      {
        "message": "product not found"
      }
      ```
- **cURL Example:**
  ```bash
  curl -X DELETE http://localhost:3000/products
  ```

### Notes

- Ensure that all required fields are filled in the request body for successful product creation.
- The PUT method allows partial updates; you only need to include the fields that you want to update.
- The DELETE endpoint will remove the product if it exists; otherwise, it will return a "product not found" message.

---