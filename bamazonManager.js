var mysql = require("mysql");
var inquirer = require("inquirer");
var Database = require("./js/database");
const { table } = require('table');

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
        database.getAllItems(false, function (data) {
            if (data.length == 0) {
                console.log("No products found!");
            } else {
                let output = table(data);
                console.log(output);
            }
        });
    } else if (answers.options == "View Low Inventory") {
        database.getLowInventory(function (data) {
            if (data.length == 0) {
                console.log("No products found!");
            } else {
                let output = table(data);
                console.log(output);
            }
        });
    } else if (answers.options == "Add to Inventory") {
        database.getAllItems(true, function (itemsArr) {
            let productNameArr = [];
            if (itemsArr.length > 0) {
                for (var i = 0; i < itemsArr.length; i++) {
                    if (i == 0) { productNameArr.push('Product Id - Product Name'); }
                    productNameArr.push(`${itemsArr[i].item_id} - ${itemsArr[i].product_name}`);
                }
            }
            inquirer.prompt([
                {
                    type: "list",
                    name: "options",
                    message: "Please select a product",
                    choices: productNameArr
                },
                {
                    type: "input",
                    name: "quantity",
                    message: "Enter quantity"
                }
            ]).then(function (answers) {
                let prodArr = [];
                prodArr = answers.options.split("-");
                database.getItem({ "item_id": prodArr[0] }, function (res) {
                    database.addToInventory(res, answers);
                });
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