const mySQL = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "EmployeeTracker"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    startInquirer();
  });

  
  function startInquirer() {


  };


// Build a command-line application that at a minimum allows the user to:

//   * Add departments, roles, employees

  
  function createDepartment(departmentName) {
    console.log("Inserting a new department...\n");
    var query = connection.query(
      "INSERT INTO department SET ?",
      {
        name: departmentName,
      },
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " department(s) inserted!\n");
      }
    );
  
    // logs the actual query being run
    console.log(query.sql);
  };

  function createRole(roleTitle, salary, departmentId) {
    console.log("Inserting a new role...\n");
    var query = connection.query(
      "INSERT INTO role SET ?",
      {
          title: roleTitle,
          salary: salary,
          department_id: departmentId
      },
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " role(s) inserted!\n");
      }
    );
  
    // logs the actual query being run
    console.log(query.sql);
  };
  
  function createEmployee(firstName, lastName, roleId, managerId) {
    console.log("Inserting a new employee...\n");
    var query = connection.query(
      "INSERT INTO employee SET ?",
      {
          first_name: firstName,
          last_name: lastName,
          role_id: roleId,
          manager_id: managerId
      },
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " employee(s) inserted!\n");
      }
    );
  
    // logs the actual query being run
    console.log(query.sql);
  };
  
  
//   * View departments, roles, employees

function logDepartments() {
    
}

//   * Update employee roles


// Bonus points if you're able to:

//   * Update employee managers

//   * View employees by manager

//   * Delete departments, roles, and employees

//   * View the total utilized budget of a department -- ie the combined salaries of all employees in that department


  
//   function createProduct() {
//     console.log("Inserting a new product...\n");
//     var query = connection.query(
//       "INSERT INTO products SET ?",
//       {
//         flavor: "Rocky Road",
//         price: 3.0,
//         quantity: 50
//       },
//       function(err, res) {
//         if (err) throw err;
//         console.log(res.affectedRows + " product inserted!\n");
//         // Call updateProduct AFTER the INSERT completes
//         updateProduct();
//       }
//     );
  
//     // logs the actual query being run
//     console.log(query.sql);
//   }
  
//   function updateProduct() {
//     console.log("Updating all Rocky Road quantities...\n");
//     var query = connection.query(
//       "UPDATE products SET ? WHERE ?",
//       [
//         {
//           quantity: 100
//         },
//         {
//           flavor: "Rocky Road"
//         }
//       ],
//       function(err, res) {
//         if (err) throw err;
//         console.log(res.affectedRows + " products updated!\n");
//         // Call deleteProduct AFTER the UPDATE completes
//         deleteProduct();
//       }
//     );
  
//     // logs the actual query being run
//     console.log(query.sql);
//   }
  
//   function deleteProduct() {
//     console.log("Deleting all strawberry icecream...\n");
//     connection.query(
//       "DELETE FROM products WHERE ?",
//       {
//         flavor: "strawberry"
//       },
//       function(err, res) {
//         if (err) throw err;
//         console.log(res.affectedRows + " products deleted!\n");
//         // Call readProducts AFTER the DELETE completes
//         readProducts();
//       }
//     );
//   }
  
//   function readProducts() {
//     console.log("Selecting all products...\n");
//     connection.query("SELECT * FROM products", function(err, res) {
//       if (err) throw err;
//       // Log all results of the SELECT statement
//       console.log(res);
//       connection.end();
//     });
//   }
  