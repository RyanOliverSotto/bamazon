//  NPM mySQL, inquirer, cli-table
var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');
var table = new Table({
    head: ['Depart ID', 'Dept Name', 'Over Head', 'Product Sales', 'Total Profit'],
    colWidths: [20, 40, 15, 15,15]
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

manageRegion();

function manageRegion(){
        //ask the manager for input
        inquirer.prompt([{
            name:"mainMenu",
            type:"list",
            message:"Welcome to Bamazon! What would like to do today?",
            choices:[
                "View Product Sales by Department",
                "Create New Department"
            ] 
        }]).then (function(resp){
            //console.log ("here")
            switch (resp.mainMenu) {

                case "View Product Sales by Department":
                  viewProducts();
                  //console.log ("view products");
                  break;
          
                case "Create New Department":
                  addDept();
                  //console.log ("add new");    
                  break;
                }
        })
    }//End connection.query

    function viewProducts(){
    strSQL ="Select B. department_id, A.department_name, b.over_head_costs, sum(A.product_sales) as Total_Sales_By_Dept,"
    strSQL+=" sum(A.product_sales) - B.over_head_costs as Profit from products A, departments B ";
    strSQL+="where a.department_name = b.department_name Group by department_name ORder by department_id ";
    connection.query(strSQL, function (err, res) {
                // console.log(res);
                if (err) throw err;
                // display products and price to user with low inventory
                for (var i = 0; i < res.length; i++) 
                {
                  table.push([res[i].department_id, res[i].department_name, res[i].over_head_costs, res[i].Total_Sales_By_Dept, res[i].Profit])
                }
                console.log(table.toString());  
                connection.close;    
                repeat();
            })
        };
    

    function addDept(){
        inquirer.prompt([/* Pass your questions in here */
            {name: "dept",
            type: "input",
            message: "Enter the name of the department to add to the region.",
            validate: function (value) {
                if (value == null || value == "") {
                  return false;
                } else {
                  return true;
                }
              }
            },
            {
            name: "ohCost",
            type: "input",
            message: "Enter the over head costs of the new department.",
            validate: function (value) {
                if (value == null || value == "") {
                  return false;
                } else {
                  return true;
                }
              }  
            }
        ]).then(function(answers){
            var query = connection.query(
                "INSERT INTO departments SET ?",
                {
                  department_name: answers.dept,
                  over_head_costs: answers.ohCost,
                },
                function(err, res) {
                if (err) throw err;
                  console.log(res.affectedRows + " NEW row affected. Department inserted!\n");
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
          message: "Would you like to continue managing the region?"
        }).then(function (answer) {
          if (answer.manage == "Yes") {
            manageRegion();
          }
          else {
            console.log(`${FgMagenta} Have a great day! ${FgWhite}`)
            connection.end();
          }
        });
    }