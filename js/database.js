require("dotenv").config();

var mysql = require("mysql");

function Database() {
    this.connection = mysql.createConnection({
        host: "localhost",

        // Your port; if not 3306
        port: 3306,

        // Your username
        user: "root",

        // Your password
        password: "kshruti30",
        database: "bamazon"
    });
}

Database.prototype.connect = function () {
    this.connection.connect(function (err) {
        if (err) throw err;
        //console.log("connected as id " + this.connection.threadId);
    });
}

Database.prototype.getAllItems = function (returnArrFlag = false, cb) {
    this.connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        if (returnArrFlag) {
            cb(res);
            return true;
        }
        /*console.log("Item Id | Product Name | Price");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price);
        }
        console.log("-----------------------------------");
        return true;*/
        let productArr = [];
        for (var i = 0; i < res.length; i++) {
            if (i == 0) {
                productArr.push(["Item Id", "Product Name", "Price"]);
            }
            productArr.push([res[i].item_id, res[i].product_name, res[i].price]);
        }
        cb(productArr);
    });
}

Database.prototype.getItem = function (data) {
    console.log("Selecting a product...\n");
    var query = this.connection.query(
        "SELECT * FROM products WHERE ?",
        {
            item_id: data.item_id
        }, function (err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            return true;
        });
    //console.log(query.sql);
    this.connection.end();
}

Database.prototype.getLowInventory = function () {
    this.connection.query("SELECT * FROM products where quantity<5", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            if (i == 0) {
                console.log("Item Id | Product Name | Price");
            }
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price);
        }
        console.log("-----------------------------------");
        if (res.length == 0) console.log("No products found!");
        return true;
    });
    this.connection.end();
}

Database.prototype.addToInventory = function (oldData, data) {
    console.log("Updating a product...\n");
    var query = this.connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                quantity: (oldData[0]['quantity'] + parseFloat(data.quantity))
            },
            {
                item_id: oldData[0]['item_id']
            }
        ],
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " product inserted!\n");
        });

    //console.log(query.sql);
    this.connection.end();
}

Database.prototype.addNewItem = function (data) {
    console.log("Inserting a new product...\n");
    var query = this.connection.query(
        "INSERT INTO products SET ?",
        {
            product_name: data.product_name,
            price: data.price,
            quantity: data.quantity,
            department_name: data.department_name
        },
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " product inserted!\n");
        });

    //console.log(query.sql);
    this.connection.end();
}

Database.prototype.addNewDepartment = function (data) {
    console.log("Inserting a new department...\n");
    var query = this.connection.query(
        "INSERT INTO departments SET ?",
        {
            department_name: data.department_name,
            over_head_costs: data.over_head_costs
        },
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " department inserted!\n");
        });

    //console.log(query.sql);
    this.connection.end();
}

Database.prototype.getProductSales = function (cb) {
    var query = this.connection.query("SELECT d.*, p.product_sales, (d.over_head_costs-p.product_sales) AS total_profit FROM departments d LEFT JOIN products p ON(d.department_name=p.department_name) group by d.department_name", function (err, res) {
        let output;

        if (err) throw err;
        let productArr = [];
        for (var i = 0; i < res.length; i++) {
            if (i == 0) {
                productArr.push(["Department Id", "Department Name", "Overhead Costs", "Products Sales", "Total Profit"]);
            }
            productArr.push([res[i].department_id, res[i].department_name, res[i].over_head_costs, res[i].product_sales, res[i].total_profit]);
        }
        return cb(productArr);
    });
    //console.log(query.sql);
    this.connection.end();
}

Database.prototype.getItem = function (data, cb) {
    console.log("Selecting a product...\n");
    var query = this.connection.query(
        "SELECT * FROM products WHERE ?",
        {
            item_id: data.item_id
        }, function (err, res) {
            if (err) throw err;
            cb(res);
        });
    //console.log(query.sql);
    this.connection.end();
}

Database.prototype.updateProduct = function (oldData, newQuantity) {
    console.log("Updating all product quantities...\n");
    var query = this.connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                quantity: (oldData[0].quantity - newQuantity),
                product_sales: (oldData[0].product_sales + (oldData[0].price * newQuantity))
            },
            {
                item_id: oldData[0].item_id
            }
        ],
        function (err, res) {
            if (err) throw err;
            return true;
        }
    );

    // logs the actual query being run
    //console.log(query.sql);
    this.connection.end();
}

module.exports = Database;
