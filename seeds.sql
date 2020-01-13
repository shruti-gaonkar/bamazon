USE bamazon;

INSERT INTO products(product_name, department_name, price, quantity)
VALUES ("Shampoo", "Beauty", 40.50, 10000),
("Soap", "Beauty", 10.00, 10000),
("Face wash", "Beauty", 5.40, 5000),
("Conditioner", "Beauty", 12.40, 5000),
("T-shirts", "Clothing", 100.50, 10000),
("Milk", "Food", 5.40, 10000),
("Body Lotion", "Beauty", 15.40, 2000);

INSERT INTO departments(department_name, over_head_costs)
VALUES ("Beauty", 70000),
("Clothing", 80000),
("Food", 80000);

