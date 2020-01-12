var inquirer = require("inquirer");
var connection = require("./js/config.js");
var Database = require("./js/database");

var database = new Database();

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
    database.getItem(answers, function (res) {
        if (res[0].quantity > 0) {
            if (res[0].quantity >= answers.quantity) {
                database.updateProduct(res, answers.quantity);
                let total_cost = res[0].price * answers.quantity;
                console.log(`The total cost of your purchase is $${total_cost.toFixed(2)}`);
            } else {
                console.log(`Only ${res[0].quantity} left!`);
            }
        } else {
            console.log("Insufficient quantity!");
        }
    });
});