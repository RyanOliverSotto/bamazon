var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');
var productList = [];
var table = new Table({
head:['Item ID', 'Item', 'Price', 'Qnty'],
colWidths: [10, 40, 10 , 10]
});

// CLI Text colors I like to use 
var FgBlue = "\x1b[34m";
var FgWhite = "\x1b[0m";
var FgCyan = "\x1b[36m";
var FgGreen = "\x1b[32m";
var FgMagenta = "\x1b[35m";

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "J0sh85Ni",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  readProducts();
});

function readProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products order by product_name asc", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      for (var i = 0; i < res.length; i++) {
        //console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name+ " | " + res[i].price + " | " + res[i].stock_quantity);
        //debugger
        productList.push(res);
        //console.log (productList[i]);
        table.push(
            [res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity]
        );
        
      }
      connection.end();
      console.log(table.toString());
    });
  }

// Prompt the user to provide location information.

  