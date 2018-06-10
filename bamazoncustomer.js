//  NPM mySQL, inquirer, cli-table
var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');
var table = new Table({
  head: ['Item ID', 'Item', 'Price', 'Qnty'],
  colWidths: [20, 40, 15, 15]
});


// CLI Text colors I like to use 
var FgBlue = "\x1b[34m";
var FgWhite = "\x1b[0m";
var FgCyan = "\x1b[36m";
var FgGreen = "\x1b[32m";
var FgMagenta = "\x1b[35m";

//Declare the connection object
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "J0sh85Ni",
  database: "Bamazon"
});


connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});


goShopping();

//displays products in database table
function goShopping() {
  connection.query('SELECT * FROM Products', function (err, res) {
    // console.log(res);

    // display products and price to user
    for (var i = 0; i < res.length; i++) {
      table.push([res[i].item_id, res[i].product_name, res[i].price.toFixed(2), res[i].stock_quantity])
    }
    console.log(table.toString());

    // ask user questions for purchase 
    inquirer.prompt([{
      // ask user to choose a product to purchase
      name: "choice",
      type: "rawlist",
      message: "What would you like to buy?",
      choices: function (value) {
        var choiceArray = [];
        for (var i = 0; i < res.length; i++) {
          choiceArray.push(res[i].product_name);
        }
        return choiceArray;
      }
    }, {
      // ask user to enter a quantity to purchase
      name: "quantity",
      type: "input",
      message: "How many would you like to buy?",
      validate: function (value) {
        if (isNaN(value) == false) {
          return true;
        } else {
          return false;
        }
      }
    }]).then(function (answer) {
      // grabs the entire object for the product the user chose
      for (var i = 0; i < res.length; i++) {
        if (res[i].product_name == answer.choice) {
          var chosenItem = res[i];
        }
      }
          //console.log(chosenItem.product_sales);
      // calculate remaining stock if purchase occurs
      var updateStock = parseInt(chosenItem.stock_quantity) - parseInt(answer.quantity);
      var pSales = parseFloat(chosenItem.product_sales).toFixed(2);
      //console.log (`PSale: ${pSales}`);
      // if customer wants to purchase more than available in stock, user will be asked if he wants to make another purchase
      if (chosenItem.stock_quantity < parseInt(answer.quantity)) {
        console.log(`${FgCyan} Insufficient quantity! ${FgWhite}`);

        repeat();
      }
      // if the customer wants to purchase an amount that is in stock, the remaining stock quantity will be updated in the database and the price presented to the customer
      else {
        
        // Challenge 3 logic. Get total from new purchase, fetch current sales from table and add together.
        
        var Total = (parseFloat(answer.quantity) * chosenItem.price).toFixed(2);
        //console.log(`Total: ${Total}`);
        //console.log (parseFloat(Total) + parseFloat(pSales)).toFixed(2);
        var pTotal = (parseFloat(Total) + parseFloat(pSales)).toFixed(2);
        //console.log(chosenItem.product_Sales);
        var query = connection.query("UPDATE Products SET ?, ? WHERE ?", [{ stock_quantity: updateStock }, {product_sales: pTotal},{ item_id: chosenItem.item_id }], function (err, res) {
          if (err) throw err;
          console.log(`${FgCyan} Purchase successful! ${FgWhite}`);
          //var Total = (parseFloat(answer.quantity) * chosenItem.price).toFixed(2);
          console.log("Your total is $" + FgGreen + Total);
          repeat();
        });
      }

    }); // .then of inquirer prompt

  }); // first connection.query of the database

} // goShopping function

function repeat() {
  inquirer.prompt({
    // ask user if he wants to purchase another item
    name: "repurchase",
    type: "list",
    choices: ["Yes", "No"],
    message: "Would you like to purchase another item?"
  }).then(function (answer) {
    if (answer.repurchase == "Yes") {
      goShopping();
    }
    else {
      console.log(`${FgMagenta} Thanks for shopping for us. Have a great day! ${FgWhite}`)
      connection.end();
    }
  });
}