### [< BACK](../ReadMe.md)
## User Management API Documentation

### Overview

This API provides endpoints to manage user data, including retrieving, creating, updating, and deleting user information. The information includes username, email, phone number, and address.

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

#### 1. Get User Information

- **Method:** GET
- **URL:** `/profile`
- **Description:** Retrieves user information.
- **Response:**
  - **Status Code:** 200 OK
  - **Body:**
    ```json
    {
      "userName": "string",
      "emailId": "string",
      "phoneNumber": "string",
      "address": {
                    "state":"string",
                    "district":"string",
                    "city": "string",
                    "pincode":"string<number>",
                    "address_lane":"string",
                    "landmark":"string"
                  }

    }
    ```
- **cURL Example:**
  ```bash
  curl -X GET http://localhost:3000/profile
  ```

#### 2. Create New User

- **Method:** POST
- **URL:** `/profile`
- **Description:** Creates a new user with the provided information.
- **Request Body:**
  ```json
  {
    "userName": "string",
    "emailId": "string",
    "phoneNumber": "string",
    "address": {
                  "state":"string",
                  "district":"string",
                  "city": "string",
                  "pincode":"string<number>",
                  "address_lane":"string",
                  "landmark":"string"
                }
  }
  ```
  ##### username & emailID is mandatory
- **Response:**
  - **Status Code:** 201 Created
  - **Body:**
    ```json
    {
      "message": "User created successfully"
    }
    ```
- **cURL Example:**
  ```bash
  curl -X POST http://localhost:3000/profile \
  -H "Content-Type: application/json" \
  -d '{
    "userName": "john_doe",
    "password": "securePassword123",
    "emailId": "john.doe@example.com",
    "phoneNumber": "+1234567890",
    "address":{
                "state": "Florida",
                "district": "Miami-Dade",
                "city": "Miami",
                "pincode": "33101",
                "address_lane": "1415 Cedar Boulevard",
                "landmark": "Close to Miami Beach"
              }
    }'
  ```

#### 3. Update User Information

- **Method:** PUT
- **URL:** `/profile`
- **Description:** Updates user information. Only the fields that need to be updated should be included in the request body.
- **Request Body:** (Example with optional fields)
  ```json
  {
    "userName": "string",
    "emailId": "string",
    "phoneNumber": "string",
    "address": {
                  "state":"string",
                  "district":"string",
                  "city": "string",
                  "pincode":"string<number>",
                  "address_lane":"string",
                  "landmark":"string"
                }
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
  curl -X PUT http://localhost:3000/profile \
  -H "Content-Type: application/json" \
  -d '{
    "emailId": "new.email@example.com",
    "address": {
                  "state":"string",
                  "district":"string",
                  "city": "string",
                  "pincode":"string<number>",
                  "address_lane":"string",
                  "landmark":"string"
                }
    }'
  ```

#### 4. Delete User

- **Method:** DELETE
- **URL:** `/profile`
- **Description:** Deletes the user.
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
    - If user is not found:
      ```json
      {
        "message": "user not found"
      }
      ```
- **cURL Example:**
  ```bash
  curl -X DELETE http://localhost:3000/profile
  ```

### Notes

- Ensure that all required fields are filled in the request body for successful user creation.
- The PUT method allows partial updates; you only need to include the fields that you want to update.
- The DELETE endpoint will remove the user if they exist; otherwise, it will return a "user not found" message.

---