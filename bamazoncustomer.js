var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');
var productList = [];
var newQnty = 0;
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
        productList.push(res[i]);
        //console.log (productList[i]);
        table.push(
            [res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity]
        );
      }
      //connection.end();
      console.log(table.toString()); 
      inqUser();
    });
  }

function inqUser(){
// Create a "Prompt" with a series of questions.
inquirer
  .prompt([
    // Here we create a basic text prompt.
    {
      type: "input",
      message: "Enter the ID of the item you want.",
      name: "item_id"
    },
    {
      type: "input",
      message: "Enter the quantity of the item you want.",
      name: "qnty",
      default: 0
    },
        // Here we ask the user to confirm.
        {
            type: "confirm",
            message: "Are you sure:",
            name: "confirm",
            default: true
          }
  ])
  .then(function(inquirerResponse) {
    // If the inquirerResponse confirms, we displays the inquirerResponse
    if (inquirerResponse.confirm) {
      console.log("\nYou have selected " + inquirerResponse.qnty + " of " + inquirerResponse.item_id);
      var strResp = checkQty(inquirerResponse.qnty,inquirerResponse.item_id);
      console.log(strResp);
      updateProduct(inquirerResponse.item_id);
    }
    else {
      console.log("\nPurchase has been cancelled.");
    }
  });
}
  
function checkQty(qnty, id){
    var inventory = productList[id].stock_quantity;
    console.log (`Qty: ${qnty} Id: ${id} Inventory: ${inventory}`)
    newQnty = parseInt(qnty) - parseInt(inventory);
    console.log(newQnty);
    if (qnty > inventory){
        return "Inadequate supply on hand. Please lower your amount.";
        10
    }
    if (qnty <= inventory)
    {
        return "Transaction in progress.";
    }
}

function updateProduct(id){

        console.log("Updating stock inventory...\n");
        var query = connection.query(
          "UPDATE products SET ? WHERE ?",
          [
            {
              stock_quantity: newQnty
            },
            {
              item_id: id
            }
          ],
          function(err, res) {
            console.log(query);
            console.log("Products updated!\n");
            connection.end();
            // Call deleteProduct AFTER the UPDATE completes
            //deleteProduct();
          }
        );
      
}