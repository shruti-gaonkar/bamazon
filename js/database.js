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
            let productNameArr = [];
            for (var i = 0; i < res.length; i++) {
                productNameArr.push(res[i].product_name);
            }
            cb(null, res);
        }
        console.log("Item Id | Product Name | Price");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price);
        }
        console.log("-----------------------------------");
        return true;
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
    console.log(query.sql);
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
}

/*function addToInventory() {

}*/

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

    console.log(query.sql);
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

    console.log(query.sql);
}

Database.prototype.getProductSales = function () {
    this.connection.query("SELECT d.*, p.product_sales, (d.over_head_costs-p.product_sales) AS total_profit FROM departments d LEFT JOIN products p ON(d.department_name=p.department_name) group by d.department_name", function (err, res) {
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
}
/*module.exports.connect = connect;
module.exports.getAllItems = getAllItems;
module.exports.getLowInventory = getLowInventory;*/

module.exports = Database;
