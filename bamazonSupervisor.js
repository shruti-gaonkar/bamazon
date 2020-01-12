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
        choices: ["View Product Sales by Department", "Create New Department"]
    }
]).then(function (answers) {
    if (answers.options == "View Product Sales by Department") {
        database.getProductSales(function (data) {
            if (data.length == 0) {
                console.log("No products found!");
            } else {
                output = table(data);
                console.log(output);
            }
        });
    } else if (answers.options == "Create New Department") {
        inquirer.prompt([
            {
                type: "input",
                name: "department_name",
                message: "Enter the name of the department"
            },
            {
                type: "number",
                name: "over_head_costs",
                message: "Enter the overhead costs"
            }
        ]).then(function (ans) {
            database.addNewDepartment(ans);
        });
    }
});