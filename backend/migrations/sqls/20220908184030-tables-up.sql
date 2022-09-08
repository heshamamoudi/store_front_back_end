
-- tables creation
CREATE TABLE users (id SERIAL PRIMARY KEY,
first_name VARCHAR(100), last_name VARCHAR(100),
username VARCHAR(100),password VARCHAR(100) );

CREATE TABLE products (id SERIAL PRIMARY KEY,
            name VARCHAR(64) NOT NULL,
            price integer NOT NULL,
            category VARCHAR(20),urlimage text);

CREATE TABLE orders (id SERIAL PRIMARY KEY, 
    status VARCHAR(64),
     user_id bigint REFERENCES users(id));

CREATE TABLE cart (
    id SERIAL PRIMARY KEY,
    quantity integer NOT NULL,
    order_id bigint REFERENCES orders(id) NOT NULL,
    product_id bigint REFERENCES products(id) NOT NULL
);

-- tables insertion
INSERT INTO products(name , price, category , urlimage) VALUES ('Product1',100,'electronics','http://localhost:5000/images/pr1.jpg');
INSERT INTO products(name , price, category , urlimage) VALUES ('Product2',200,'electronics','http://localhost:5000/images/pr2.jpg');
INSERT INTO products(name , price, category , urlimage) VALUES ('Product3',300,'electronics','http://localhost:5000/images/pr3.jpg');
INSERT INTO products(name , price, category , urlimage) VALUES ('Product4',400,'electronics','http://localhost:5000/images/pr4.jpg');
INSERT INTO products(name , price, category , urlimage) VALUES ('Product5',500,'electronics','http://localhost:5000/images/pr5.jpg');
INSERT INTO products(name , price, category , urlimage) VALUES ('Product6',600,'electronics','http://localhost:5000/images/pr6.jpg');
INSERT INTO products(name , price, category , urlimage) VALUES ('Product7',700,'electronics','http://localhost:5000/images/pr7.jpg');