### [< BACK](../ReadMe.md)
# DATABASE SCHEMA

## User Management

### `auth` Table
- `emailId`: `TEXT`
- `password`: `TEXT`
- `userId`: `INT`

### `USERS` Table
- `userName`: `TEXT`
- `displayName`: `TEXT`
- `emailId`: `TEXT`
- `phoneNumber`: `TEXT`
- `delivery Address`: `JSON`


## Transaction & Orders Management

### `ORDERS` Table
- `order_id`: `TEXT` (e.g., FMG-0001)
- `deliveryAddress`: `TEXT`
- `amount_paid`: `FLOAT`
- `mode_of_transaction`: `ENUM` ('CARD', 'UPI')
- `tracking_id`: `TEXT`
- `ordered_time`: `DATETIME`
- `net_discount`: `FLOAT`
- `net_tax`: `FLOAT`
- `transaction_ids`: `JSON`

### `Product-Transaction` Table
- `order_id`: `FK`
- `product_id`: `FK`
- `original_price`: `FLOAT`
- `discount`: `FLOAT`
- `final_price`: `FLOAT`
- `tax`: `FLOAT`

## Product & Inventory Management

### `PRODUCT` Table
- `name`: `TEXT`
- `price`: `FLOAT`
- `discount`: `FLOAT`
- `quantity`: `INT`
- `description`: `TEXT`
- `images`: `JSON`
- `parameters`: `JSON`
- `extras`: `JSON`
- `sale_id`: `FK`
- `category_id`: `FK`

### `CATEGORIES` Table
- `name`: `TEXT`
- `product_ids`: `JSON`
- `description`: `TEXT`
- `images`: `JSON`
- `extras`: `JSON`

## Cart Management

### `CART` Table
- `user_id`: `INT`
- `product_ids`: `JSON`

## Sale Events Management

### `EVENTS` Table
- `name`: `TEXT`
- `description`: `TEXT`
- `images`: `JSON`
- `product_ids`: `JSON`
- `extras`: `JSON`
