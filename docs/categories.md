### [< BACK](../ReadMe.md)
## Categories Management API Documentation

### Overview

This API provides endpoints to manage categories of products, including retrieving, creating, updating, and deleting category information. Each category includes a name, associated product IDs, description, and images.

### Base URL

The base URL for all endpoints is: `http://localhost:3000`

## ENDPOINTS

#### 1. Get Categories Information

- **Method:** GET
- **URL:** `/categories`
- **Description:** Retrieves all categories' information.
- **Response:**
  - **Status Code:** 200 OK
  - **Body:**
    ```json
    [
      {
        "id": 1,
        "Name": "Electronics",
        "Product_ids": [101, 102, 103],
        "Description": "Category for electronic devices.",
        "Images": ["link 1", "link 2", "link 3"]
      },
      {
        "id": 2,
        "Name": "Fashion",
        "Product_ids": [201, 202],
        "Description": "Category for fashion items.",
        "Images": ["link 1", "link 2"]
      }
    ]
    ```
- **cURL Example:**
  ```bash
  curl -X GET http://localhost:3000/categories
  ```

#### 2. Get Category by ID

- **Method:** GET
- **URL:** `/categories/:id`
- **Description:** Retrieves a single category's information by its ID.
- **Parameters:**
  - **id:** The ID of the category to retrieve.
- **Response:**
  - **Status Code:** 200 OK
  - **Body:**
    ```json
    {
      "id": 1,
      "Name": "Electronics",
      "Product_ids": [101, 102, 103],
      "Description": "Category for electronic devices.",
      "Images": ["link 1", "link 2", "link 3"]
    }
    ```
- **cURL Example:**
  ```bash
  curl -X GET http://localhost:3000/categories/1
  ```

#### 3. Create New Category

- **Method:** POST
- **URL:** `/categories`
- **Description:** Creates a new category with the provided information.
- **Request Body:**
  ```json
  {
    "Name": "Fashion",
    "Product_ids": [201, 202],
    "Description": "Category for fashion items.",
    "Images": ["http://example.com/image1.jpg", "http://example.com/image2.jpg"]
  }
  ```
- **Response:**
  - **Status Code:** 201 Created
  - **Body:**
    ```json
    {
      "message": "Category created successfully"
    }
    ```
- **cURL Example:**
  ```bash
  curl -X POST http://localhost:3000/categories \
  -H "Content-Type: application/json" \
  -d '{
    "Name": "Fashion",
    "Product_ids": [201, 202],
    "Description": "Category for fashion items.",
    "Images": ["http://example.com/image1.jpg", "http://example.com/image2.jpg"]
  }'
  ```

#### 4. Update Category Information

- **Method:** PUT
- **URL:** `/categories`
- **Description:** Updates category information. Only the fields that need to be updated should be included in the request body.
- **Request Body:** (Example with optional fields)
  ```json
  {
    "Name": "Fashion",
    "Product_ids": [203, 204],
    "Description": "Updated category for fashion items.",
    "Images": ["http://example.com/image1.jpg", "http://example.com/image2.jpg"]
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
  curl -X PUT http://localhost:3000/categories \
  -H "Content-Type: application/json" \
  -d '{
    "Name": "Fashion",
    "Description": "Updated category for fashion items."
  }'
  ```

#### 5. Delete Category

- **Method:** DELETE
- **URL:** `/categories`
- **Description:** Deletes the category.
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
    - If category is not found:
      ```json
      {
        "message": "category not found"
      }
      ```
- **cURL Example:**
  ```bash
  curl -X DELETE http://localhost:3000/categories
  ```

### Notes

- Ensure that all required fields are filled in the request body for successful category creation.
- The PUT method allows partial updates; you only need to include the fields that you want to update.
- The DELETE endpoint will remove the category if it exists; otherwise, it will return a "category not found" message.

---