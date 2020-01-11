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
        let itemsArr = database.getAllItems(true);
        //let productNameArr = [];
        console.log(itemsArr);
        if (itemsArr.length > 0) {
            console.log("Items" + itemsArr);
        }

        /*for (var i = 0; i < itemsArr.length; i++) {
            productNameArr.push(itemsArr[i].product_name);
        }*/
        /*inquirer.prompt([
            {
                type: "list",
                name: "options",
                message: "Please select a product",
                choices: productNameArr
            }
        ]).then(function (answers) {
            database.addToInventory();
        });*/

    } else if (answers.options == "Add New Product") {
        database.addNewItem();
    }
});