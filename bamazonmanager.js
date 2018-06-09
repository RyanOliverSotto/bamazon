//  NPM mySQL, inquirer, cli-table
var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');
var table = new Table({
  head: ['Item ID', 'Item', 'Department', 'Price', 'Qnty'],
  colWidths: [20, 40, 35, 15, 15]
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


manageStore();

function manageStore(){
        //ask the manager for input
        inquirer.prompt([{
            name:"mainMenu",
            type:"list",
            message:"Welcome to Bamazon! What would like to do today?",
            choices:[
                "View Products for Sale",
                "View Low Inventory",
                new inquirer.Separator(),
                "Add to Inventory",
                "Add New Product"]
  
        }]).then (function(resp){
            console.log ("here")
            switch (resp.mainMenu) {
                case "View Products for Sale":
                  viewProducts();
                  console.log ("view products");
                  break;
          
                case "View Low Inventory":
                  //multiSearch();
                  console.log ("view low");
                  break;
          
                case "Add to Inventory":
                  //rangeSearch();
                  console.log ("add inv");                  
                  break;
          
                case "Add New Product":
                  //songSearch();
                  console.log ("add new");    
                  break;
                }
        })
    }//End connection.query








function viewProducts(){
    connection.query('SELECT * FROM Products', function (err, res) {
        // console.log(res);
        if (err) throw err;
        // display products and price to user
        for (var i = 0; i < res.length; i++) 
        {
          table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity])
        }
        console.log(table.toString());  
        connection.close;    
    })
    
};

