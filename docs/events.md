### [< BACK](../ReadMe.md)
## Events Management API Documentation

### Overview

This API provides endpoints to manage event data, including retrieving, creating, updating, and deleting event information. The information includes event name, description, images, and associated product IDs.

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

#### 1. Get Events Information

- **Method:** GET
- **URL:** `/events`
- **Description:** Retrieves all events' information.
- **Response:**
  - **Status Code:** 200 OK
  - **Body:**
    ```json
    [
      {
        "id": "number",
        "name": "string",
        "Description": "string",
        "images": ["link 1", "link 2", ...],
        "product_ids": [123, 453]
      },
      ...
    ]
    ```
- **cURL Example:**
  ```bash
  curl -X GET http://localhost:3000/events
  ```

#### 2. Get Event by ID

- **Method:** GET
- **URL:** `/events/:id`
- **Description:** Retrieves a single event's information by its ID.
- **Parameters:**
  - **id:** The ID of the event to retrieve.
- **Response:**
  - **Status Code:** 200 OK
  - **Body:**
    ```json
    {
      "id": "number",
      "name": "string",
      "Description": "string",
      "images": ["link 1", "link 2", ...],
      "product_ids": [123, 453]
    }
    ```
- **cURL Example:**
  ```bash
  curl -X GET http://localhost:3000/events/1
  ```

#### 3. Create New Event

- **Method:** POST
- **URL:** `/events`
- **Description:** Creates a new event with the provided information.
- **Request Body:**
  ```json
  {
    "name": "string",
    "Description": "string",
    "images": ["link 1", "link 2", ...],
    "product_ids": [123, 453]
  }
  ```
- **Response:**
  - **Status Code:** 201 Created
  - **Body:**
    ```json
    {
      "message": "Event created successfully"
    }
    ```
- **cURL Example:**
  ```bash
  curl -X POST http://localhost:3000/events \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Product Launch",
    "Description": "An event for launching new products.",
    "images": ["http://example.com/image1.jpg", "http://example.com/image2.jpg"],
    "product_ids": [123, 453]
  }'
  ```

#### 4. Update Event Information

- **Method:** PUT
- **URL:** `/events`
- **Description:** Updates event information. Only the fields that need to be updated should be included in the request body.
- **Request Body:** (Example with optional fields)
  ```json
  {
    "name": "string",
    "Description": "string",
    "images": ["link 1", "link 2", ...],
    "product_ids": [123, 453]
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
  curl -X PUT http://localhost:3000/events \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Annual Meetup",
    "Description": "An annual gathering for all stakeholders."
  }'
  ```

#### 5. Delete Event

- **Method:** DELETE
- **URL:** `/events`
- **Description:** Deletes the event.
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
    - If event is not found:
      ```json
      {
        "message": "event not found"
      }
      ```
- **cURL Example:**
  ```bash
  curl -X DELETE http://localhost:3000/events
  ```

### Notes

- Ensure that all required fields are filled in the request body for successful event creation.
- The PUT method allows partial updates; you only need to include the fields that you want to update.
- The DELETE endpoint will remove the event if it exists; otherwise, it will return an "event not found" message.

---