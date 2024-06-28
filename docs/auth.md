## Authorisation and Secure Login API

### Overview

This API provides endpoints and its functionalities related to authorisation and secure login of an user.

### Base URL

The base URL for all endpoints is:
`http://localhost:3000`

## ENDPOINTS

#### 1. Authenticate User
  
- **Method:** POST
- **URL:** `/auth`
- **Description:** Authenticates the user's credentials
- **Request Body:**
    ```json
    {
        "username": "user123",
        "password": "secretpassword"
    }
    ```
- **Response:** 
    - **Status Code:** 200 OK
    - **Body:**
    ```json
    {
        "message": "Authentication successful",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyMTIzIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    }
    ```
- **Example using Curl:** 
    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -d '{
             "username": "user123",
             "password": "secretpassword"
         }' \
         http://localhost:3000/auth
    ```

#### 2. Create Account

- **Method:** POST
- **URL:** `/auth/create`
- **Description:** Creates a new user account
- **Request Body:**
    ```json
    {
        "username": "newuser123",
        "email": "newuser@example.com",
        "password": "secretpassword",
        "phoneNumber": 1234567890,
        "delivery Address": {
                                "state": "New York",
                                "district": "New York",
                                "city": "New York",
                                "pincode": "10001",
                                "address_lane": "5678 Oak Avenue",
                                "landmark": "Next to Empire State Building"
                            }

    }
    ```
- **Response:** 
    - **Status Code:** 201 Created
    - **Body:**
    ```json
    {
        "message": "Account created successfully",
        "user_id": "user123"
    }
    ```
- **Example using Curl:** 
    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -d '{
             "username": "newuser123",
             "email": "newuser@example.com",
             "password": "secretpassword",
             "phoneNumber": 1234567890,
            "delivery Address": {
                                    "state": "New York",
                                    "district": "New York",
                                    "city": "New York",
                                    "pincode": "10001",
                                    "address_lane": "5678 Oak Avenue",
                                    "landmark": "Next to Empire State Building"
                                }
         }' \
         http://localhost:3000/auth/create
    ```

#### 3. Forgot Password apply

- **Method:** POST
- **URL:** `/auth/forgot`
- **Description:** Initiates the password reset process for a user who has forgotten their password
- **Request Body:**
    ```json
    {
        "email": "user@example.com"
    }
    ```
- **Response:** 
    - **Status Code:** 200 OK
    - **Body:**
    ```json
    {
        "message": "password reset OTP sent to user@example.com"
    }
    ```
- **Example using Curl:** 
    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -d '{"email": "user@example.com"}' \
         http://localhost:3000/auth/forgot
    ```
#### 4. Forgot Password otp verification

- **Method:** POST
- **URL:** `/auth/forgot/otp`
- **Description:** Initiates the password reset process for a user who has forgotten their password
- **Request Body:**
    ```json
    {
        "otp": "12345"
    }
    ```
- **Response:** 
    - **Status Code:** 200 OK
    - **Body:**
    ```json
    {
        "message": "OTP accepted",
        "token":"<long auth token>"
    }
    ```
- **Example using Curl:** 
    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -d '{"email": "user@example.com"}' \
         http://localhost:3000/auth/forgot/otp
    ```

#### 5. Forgot Password

- **Method:** POST
- **URL:** `/auth/forgot/reset`
- **Description:** Initiates the password reset process for a user who has forgotten their password
- **Request Header:**
    ```json
    {
        "authentication":"<long auth token>"
    }
    ```
- **Request Body:**
    ```json
    {
        "new_passoword":"iAm@Home"
    }
    ```
- **Response:** 
    - **Status Code:** 200 OK
    - **Body:**
    ```json
    {
        "message": "Password reset instructions sent to user@example.com"
    }
    ```
- **Example using Curl:** 
    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -d '{"email": "user@example.com"}' \
         http://localhost:3000/auth/forgot
    ```
