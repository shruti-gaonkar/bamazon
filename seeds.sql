USE bamazon;

INSERT INTO products(product_name, department_name, price, quantity)
VALUES ("shampoo", "beauty", 10.45, 20),
("soap", "beauty", 2.40, 15),
("face wash", "beauty", 5.40, 3),
("consitioner", "beauty", 12.40, 5);

INSERT INTO departments(department_name, over_head_costs)
VALUES ("beauty", 50.50),
("clothing", 80.50);
