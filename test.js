var mysql = require('mysql');
var inquirer = require('inquirer');
var dept = []
  var testList = ["apples", "oranges", "pears", "grapes"];
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
  
  connection.query("SELECT department_name FROM departments", function (err, res) {
    // console.log(res);
    if (err) throw err;
    // display products and price to user with low inventory
    for (var i = 0; i < res.length; i++) 
    {
        dept.push(res[i].department_name);
    }
    //console.log(dept.toString());  
    connection.close; 
})

inquirer.prompt([
{name: "dept",
type:"input",
message:"Enter the name of the department to add",
validate: function (value) {
    if (value == null || value == "") {
      return false;
    } else {
      return true;
    }
  }
},
{
   name:"deptList",
   type:"list",
   choices:dept
}]).then(function(ans){
    console.log (ans.deptList);
})
  

