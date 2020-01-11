var mysql = require("mysql");
var inquirer = require("inquirer");
var Database = require("./js/database");

var database = new Database();

inquirer.prompt([
    {
        type: "list",
        name: "options",
        message: "What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }
]).then(function (answers) {
    if (answers.options == "View Products for Sale") {
        database.getAllItems();
    } else if (answers.options == "View Low Inventory") {
        database.getLowInventory();
    } else if (answers.options == "Add to Inventory") {
        database.getAllItems(true, function (itemsArr) {
            let productNameArr = [];
            if (itemsArr.length > 0) {
                for (var i = 0; i < itemsArr.length; i++) {
                    productNameArr.push(itemsArr[i].product_name);
                }
            }
            inquirer.prompt([
                {
                    type: "list",
                    name: "product_name",
                    message: "Please select a product",
                    choices: productNameArr
                },
                {
                    type: "input",
                    name: "quantity",
                    message: "Enter quantity"
                }
            ]).then(function (answers) {
                //console.log(answers.options)
                database.addToInventory(answers);
            });
        });
    } else if (answers.options == "Add New Product") {
        inquirer.prompt([
            {
                type: "input",
                name: "product_name",
                message: "Enter the name of the product"
            },
            {
                type: "number",
                name: "quantity",
                message: "Enter units of the product"
            },
            {
                type: "number",
                name: "price",
                message: "Enter cost of the product"
            },
            {
                type: "input",
                name: "department_name",
                message: "Enter the name of the department"
            }
        ]).then(function (ans) {
            database.addNewItem(ans);
        });
    }
});