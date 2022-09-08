# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index url: localhost:5000/products
- Show (args: product id): url: localhost:5000/products/:id
- Create (args: Product)[token required]: url: localhost:5000/product

- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)


#### Users
- Index [token required] : url: localhost:5000/users
- Show (args: id)[token required]:url: localhost:5000/users/:id
- Create (args: User)[token required]: url : localhost:5000/signup

#### Orders
- Current Order by user (args: user id)[token required] : url: localhost:5000/orders
- Create :[token required] : url: localhost:5000/order
- add product :[token required] : url: localhost:5000/orders/:id/products 

- [OPTIONAL] Completed Orders by user (args: user id)[token required]


## Data Shapes
#### Product
- id: serialized
- name:varchar
- price:integer
- [OPTIONAL] category


| Products    |             |            |
|-------------|-------------|---------   |
| Column      | type        | null       |
| ----------- | ----------- |-------     |
| id          | integer     |not null    |
| price       | integer     |not null    |
| name        | varchar   |not null    |
| category    | varchar   |not null    |


#### User
- id: serialized
- firstName: varchar
- lastName:varchar
- password:varchar

|           User|             |            |
|-------------|-------------|---------   |
| Column      | type        | null       |
| ----------- | ----------- |-------     |
| id          | integer     |not null    |
| firstName   | integer     |not null    |
| lastName    | varchar   |not null    |
| password    | varchar   |not null    |

#### Orders
- id: serialized
- user_id: foreign key NOT NULL,
- status of order (active or complete): varchar

|           Order|             |            |
|-------------|-------------|---------   |
| Column      | type        | null       |
| ----------- | ----------- |-------     |
| id          | integer     |not null    |
| price       | integer     |not null    |
| name        | varchar   |not null    |

#### Orders_products join (cart)
 - id: serialized
 - quantity:quantity of the product
 - order_id foreign key NOT NULL
- product_id foreign key NOT NULL

|    cart     |               |            |
|-------------|-------------  |---------   |
| Column      | type          | null       |
| ----------- | -----------   |-------     |
| id          | integer       |not null    |
| quantity    | integer       |not null    |
| order_id    | bigint        |not null    |
| product_id  | bigint        |not null    |
