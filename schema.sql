DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INT NOT NULL auto_increment,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(4,2) NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);

CREATE TABLE departments(
	department_id INT NOT NULL auto_increment,
    department_name VARCHAR(50) NOT NULL,
    over_head_costs DECIMAL(4,2) NOT NULL,
     PRIMARY KEY (department_id)
);

ALTER TABLE products ADD COLUMN product_sales DECIMAL(10,2) AFTER quantity;

ALTER TABLE products ADD COLUMN product_sales DECIMAL(10,2) AFTER quantity;


