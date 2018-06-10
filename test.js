var mysql = require('mysql');
var inquirer = require('inquirer');

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
  

  var testList = ["apples", "oranges", "pears", "grapes"];

    connection.query("SELECT department_name from departments", function (err, res) {
      //console.log(res);
      var deptArray=[]
      if (err) throw err;
      // display products and price to user with low inventory
      for (var i = 0; i < res.length; i++) 
      {
        deptArray.push(res[i].department_name);
      }
      //console.log(deptArray.toString());
      return deptArray;  
      //connection.close;    



      function doIt(){
      inquirer.prompt([{
        name:"choice",
        type:"rawlist",
        message:"What dept?",
        choices: deptArray.toString()
      }]).then( function (answer){
        console.log (`I love the ${answer.choice} department`);



      })

}

doIt();

      //repeat();
  })
  

