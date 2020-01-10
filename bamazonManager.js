var mysql = require("mysql");
var inquirer = require("inquirer");
var database = require("./js/database");

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
    }
});