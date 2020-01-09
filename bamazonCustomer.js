var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "kshruti30",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    getAllItems();
});


function getAllItems() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("Item Id | Product Name | Price");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price);
        }
        console.log("-----------------------------------");

        inquirer.prompt([
            {
                type: "input",
                name: "item_id",
                message: "Enter the ID of the product you would like to buy?"
                /*validate: function validateInput(name) {
                    if (!name.match(/^[a-zA-Z]+$/)) {
                        return 'Only alphabets are allowed';
                    }
                    return name !== '';
                }*/
            },
            {
                type: "number",
                name: "quantity",
                message: "How many units of the product you would like to buy?"
            }
        ]).then(function (answers) {
            getItem(answers)
        });
    });
}

function getItem(answers) {
    console.log("Selecting a product...\n");
    var query = connection.query(
        "SELECT * FROM products WHERE ?",
        {
            item_id: answers.item_id
        }, function (err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            if (res[0].quantity > 0) {
                if (res[0].quantity >= answers.quantity) {
                    updateProduct(res, answers.quantity);
                } else {
                    console.log(`Only ${res[0].quantity} left!`);
                }
            } else {
                console.log("Insufficient quantity!");
            }

        });
    console.log(query.sql);
}

function updateProduct(oldData, newQuantity) {
    console.log("Updating all product quantities...\n");
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                quantity: (oldData[0].quantity - newQuantity)
            },
            {
                item_id: oldData[0].item_id
            }
        ],
        function (err, res) {
            if (err) throw err;
            //console.log(res);

            let total_cost = oldData[0].price * newQuantity;
            console.log(`The total cost of your purchase is $${total_cost}`);
            // Call deleteProduct AFTER the UPDATE completes
            // deleteProduct();
        }
    );

    // logs the actual query being run
    console.log(query.sql);
    connection.end();
}