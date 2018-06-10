//  NPM mySQL, inquirer, cli-table
var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');
var table = new Table({
  head: ['Item ID', 'Item', 'Department', 'Price', 'Qnty'],
  colWidths: [20, 40, 35, 15, 15]
});
var dept = [];

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
            //console.log ("here")
            switch (resp.mainMenu) {
                case "View Products for Sale":
                  viewProducts();
                  //console.log ("view products");
                  break;
          
                case "View Low Inventory":
                  viewLow();
                 //console.log ("view low");
                  break;
          
                case "Add to Inventory":
                  addInv();
                 // console.log ("add inv");                  
                  break;
          
                case "Add New Product":
                  addProd();
                  //console.log ("add new");    
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
        repeat();
    })
};

function viewLow(){
    connection.query("SELECT * FROM products where stock_quantity < 5", function (err, res) {
        // console.log(res);
        if (err) throw err;
        // display products and price to user with low inventory
        for (var i = 0; i < res.length; i++) 
        {
          table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity])
        }
        console.log(table.toString());  
        connection.close;    
        repeat();
    })
};

function addInv(){
    inquirer.prompt([{
    //ask the user the ID and the Quantity of the Item she wants for that row
    name:"item_id",
    type: "input",
    message: "Enter the product_id you wish to have replenished.",
    validate: function (value) {
        if (isNaN(value) == false) {
          return true;
        } else {
          return false;
        }
      }
    },
    {
        name:"updateStock",
        type: "input",
        message: "Enter the amount that you need in stock.",
        validate: function (value) {
            if (isNaN(value) == false) {
              return true;
            } else {
              return false;
            }
          }
    }]).then(function(answer){
        console.log (`Qty ${answer.updateStock} ID: ${answer.item_id}`);
        connection.query(
            "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: answer.updateStock
            },
            {
                item_id: answer.item_id
            }

        ]
        )
        console.log("Inventory has been updated!\n");
        repeat();
    })
};
//Research a way to dynamically fill the department choices used by list
function addProd(){
//Grab a list of all valid departments from department table

connection.query("SELECT department_name FROM departments", function (err, res) {
  // console.log(res);
  if (err) throw err;
  // display products and price to user with low inventory
  for (var i = 0; i < res.length; i++) 
  {
      dept.push(res[i].department_name);
  }
  console.log(dept.toString());  
  connection.close; 
})


    inquirer.prompt([/* Pass your questions in here */
    {name: "item",
    type: "input",
    message: "Enter the name of the product to add to the inventory.",
    validate: function (value) {
        if (value == null || value == "") {
          return false;
        } else {
          return true;
        }
      }
    },
    {
    name:"department",
    type: "list",
    //choices: ["Electronics","Clothing and Shoes","Home and Garden and Kitchen","Beauty and Health"],
    choices: dept,
    message: "Select appropriate department for the new product."
    },
    {
        name:"price",
        type: "input",
        message: "Enter an appropriate price for a single new product.",
        validate: function (value) {
            if (value == null || value == "") {
              return false;
            } else {
              return true;
            }
        }        
    },
    {
        name:"qnty",
        type: "input",
        message: "Enter the amount of products to stock in our inventory.",
        validate: function (value) {
            if (value == null || value == "") {
              return false;
            } else {
              return true;
            }
          }        
    },
    {
        name:"sales",
        type: "input",
        message: "Enter the amount of product sales for this item collection.",
        validate: function (value) {
            if (value == null || value == "") {
              return false;
            } else {
              return true;
            }
          }   
    }
    ]).then(function(answers) {
        //console.log("Here!");
        
        var query = connection.query(
            "INSERT INTO products SET ?",
            {
              product_name: answers.item,
              department_name: answers.department,
              price: answers.price,
              stock_quantity: answers.qnty,
              product_sales: answers.sales
            },
            function(err, res) {
            if (err) throw err;
              console.log(res.affectedRows + " NEW row affected. Product inserted!\n");
             connection.end;
             repeat();
            }
          );

    });

}


function repeat() {
    inquirer.prompt({
      // ask user if he wants to purchase another item
      name: "manage",
      type: "list",
      choices: ["Yes", "No"],
      message: "Would you like to continue managing the store?"
    }).then(function (answer) {
      if (answer.manage == "Yes") {
        manageStore();
      }
      else {
        console.log(`${FgMagenta} Have a great day! ${FgWhite}`)
        connection.end();
      }
    });
}