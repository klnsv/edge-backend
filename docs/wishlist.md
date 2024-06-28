## Wishlist API

### Overview

This API provides endpoints to manage the Wishlist data of a particular user.

### Base URL

The base URL for all endpoints is:
`http://localhost:3000`
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

#### 1. Get Wishlist

- **Method:** GET
- **URL:** `/Wishlist`
- **Description:** Retrieves all the products in the wishlist
- **Response:** 
    - **Status Code:** 200 OK
    - **Body:**
    ```json
    [
        {
            "product_id": "Product id",
            "Price": "Price",
            "Discount": "Discount",
            "Quantity": "Quantity",
            "Description": "Description",
            "Images": "Images",
            "parameter": "Parameter"
        }
    ]
    ```
- **Example:** 
    ```bash
    curl -X GET \
     -H "Content-Type: application/json" \
     http://localhost:3000/Wishlist

    ```

#### 2. Add to Wishlist

- **Method:** POST
- **URL:** `/Wishlist`
- **Description:** Adds a product to the wishlist
- **Request Body:**
    ```json
    {
        "product_id": 123,
        "qty": 1
    }
    ```
- **Response:** 
    - **Status Code:** 200 OK
    - **Body:**
    ```json
    {
        "message": "Product added to wishlist successfully",
        "items": [
            {
                "product_id": 123,
                "qty": 1
            }
        ]
    }
    ```
- **Example using Curl:** 
    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -d '{"product_id": 123, "qty": 1}' \
         http://localhost:3000/Wishlist
    ```
