var mysql = require("mysql");
var inquirer = require("inquirer");

inquirer.prompt([
    {
        type: "input",
        name: "vproducts",
        message: "View Products for Sale"
    },
    {
        type: "input",
        name: "vlinventory",
        message: "View Low Inventory"
    },
    {
        type: "input",
        name: "addtoinventory",
        message: "Add to Inventory"
    },
    {
        type: "input",
        name: "addproduct",
        message: "Add New Product"
    }
]).then(function (answers) {
    getItem(answers)
});