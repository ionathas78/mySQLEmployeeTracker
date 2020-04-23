//      Uses _connection from the primary module

const app = require("../app.js");
const inquirer = require("inquirer");

 
  //        **      UI Functions
  
  //    Initial Menu            
  //        Employees Menu
  //        Manager Menu
  //        Administrators Menu
  //    

module.exports = {
    initialMenu : function() {
        let choicesArray = [
            "Employees Menu",
            "Managers Menu",
            "Administrators Menu",
            "Exit"
        ]
        inquirer.prompt(
            {
                name: "userChoice",
                type: "list",
                message: "Root Menu:",
                choices: choicesArray
            })
            .then(response => {
                console.log(response.userChoice);
                switch (response.userChoice) {
                    case choicesArray[0]:
                        employeesMenu(initialMenu);
                        break;
                    case choicesArray[1]:
                        managersMenu(initialMenu);
                        break;
                    case choicesArray[2]:
                        administratorsMenu(initialMenu);
                        break;
                    case choicesArray[3]:
                        endSession();
                        break;
                    default:     
                        console.log("X");
                };
            });
    },


    //    Report Menu
    //        Department Report
    //        Role Report
    //        Employee Report
    //        Employee Salary Report
    //        Manager Report
    //

    //
    //    Employees Menu
    //        Change First Name
    //        Change Last Name
    //        Change Email
    //        Change Extension
    //        Change Computer Name
    //

    employeesMenu: function(callbackFunction) {
        let menuName = "Employees"
        let choicesArray = [
            "Back",
            "",
            "Exit"
        ];
        inquirer.prompt(
            {
                name: "userChoice",
                type: "list",
                message: menuName + " Menu:",
                choices: choicesArray
            })
            .then(response => {
                console.log(response.userChoice);
                switch (response.userChoice) {
                    case choicesArray[0]:
                        callbackFunction();
                        break;
                    case choicesArray[1]:

                        break;
                    case choicesArray[choicesArray.length - 1]:
                        app.endSession();
                        break;
                    default:     
                        console.log("Invalid choice '" + response.userChoice + "'!");
                };
            });
    },

    //    
    //    Manager Menu
    //        Add Employee
    //        Remove Employee
    //        Change Role
    //        Change Manager
    //        

    managersMenu: function(callbackFunction) {
        let menuName = "Managers"
        let choicesArray = [
            "Back",
            "",
            "Exit"
        ];
        inquirer.prompt(
            {
                name: "userChoice",
                type: "list",
                message: menuName + " Menu:",
                choices: choicesArray
            })
            .then(response => {
                console.log(response.userChoice);
                switch (response.userChoice) {
                    case choicesArray[0]:
                        callbackFunction();
                        break;
                    case choicesArray[1]:
    
                        break;
                    case choicesArray[choicesArray.length - 1]:
                        app.endSession();
                        break;
                    default:     
                        console.log("Invalid choice '" + response.userChoice + "'!");
                };
            });
    },
    
    //
    //    Administrator Menu
    //        Department Menu
    //        Role Menu
    //        

    administratorsMenu: function(callbackFunction) {
        let menuName = "Admin"
        let choicesArray = [
            "Back",
            "",
            "Exit"
        ];
        inquirer.prompt(
            {
                name: "userChoice",
                type: "list",
                message: menuName + " Menu:",
                choices: choicesArray
            })
            .then(response => {
                console.log(response.userChoice);
                switch (response.userChoice) {
                    case choicesArray[0]:
                        callbackFunction();
                        break;
                    case choicesArray[1]:
    
                        break;
                    case choicesArray[choicesArray.length - 1]:
                        app.endSession();
                        break;
                    default:     
                        console.log("Invalid choice '" + response.userChoice + "'!");
                };
            });
    },
    
    //    
    //    Role Menu
    //        Change Role Name
    //        Change Role Salary
    //        Change Role Department
    //        Add New Role
    //        Remove Role
    //

    roleMenu: function(callbackFunction) {
        let menuName = "Roles"
        let choicesArray = [
            "Back",
            "",
            "Exit"
        ];
        inquirer.prompt(
            {
                name: "userChoice",
                type: "list",
                message: menuName + " Menu:",
                choices: choicesArray
            })
            .then(response => {
                console.log(response.userChoice);
                switch (response.userChoice) {
                    case choicesArray[0]:
                        callbackFunction();
                        break;
                    case choicesArray[1]:
    
                        break;
                    case choicesArray[choicesArray.length - 1]:
                        app.endSession();
                        break;
                    default:     
                        console.log("Invalid choice '" + response.userChoice + "'!");
                };
            });
    },
    
    //
    //    Department Menu 
    //        Change Department Name
    //        Add New Department
    //        Remove New Department
    //

    departmentMenu: function(callbackFunction) {
        let menuName = "Departments"
        let choicesArray = [
            "Back",
            "",
            "Exit"
        ];
        inquirer.prompt(
            {
                name: "userChoice",
                type: "list",
                message: menuName + " Menu:",
                choices: choicesArray
            })
            .then(response => {
                console.log(response.userChoice);
                switch (response.userChoice) {
                    case choicesArray[0]:
                        callbackFunction();
                        break;
                    case choicesArray[1]:
    
                        break;
                    case choicesArray[choicesArray.length - 1]:
                        app.endSession();
                        break;
                    default:     
                        console.log("Invalid choice '" + response.userChoice + "'!");
                };
            });
    },
    

    startInquirer: function() {


    },



    //        **      Database Functions

    // Build a command-line application that at a minimum allows the user to:

    //   * Add departments, roles, employees

    /**
     * Insert a new record into the department table
     * @param {Text} departmentName Name of department to add
     */  
    createDepartment: function(departmentName) {
        let tableName = "department";
        let setClause = { name: departmentName };
        insertQuery(tableName, setClause);
    },

    /**
     * Insert a new record into the department table
     * @param {Text} roleTitle Name of role to add
     * @param {Number} salary Salary to list under role
     * @param {Number} departmentId ID of department to which the role belongs
     */
    createRole: function(roleTitle, salary, departmentId) {
        let tableName = "role";
        let setClause = { title: roleTitle, salary: salary, department_id: departmentId };
        insertQuery(tableName, setClause);
    },

    /**
     * Insert a new record into the employee table
     * @param {Text} firstName First Name of employee
     * @param {Text} lastName Last Name of employee
     * @param {Number} roleId ID of employee's role
     * @param {Number} managerId ID of employee managing the employee
     */  
    createEmployee: function(firstName, lastName, roleId, managerId) {
        let tableName = "employee";
        let setClause = { first_name: firstName, last_name: lastName, role_id: roleId, manager_id: managerId }
        insertQuery(tableName, setClause);
    },
    
    
    //   * View departments, roles, employees

    /**
     * Display contents of department table to the console
     */
    logDepartments: function() {
        let tableName = "department";
        logQuery(tableName, "*");
    },

    /**
     * Display contents of role table to the console
     */
    logRoles: function() {
        let tableName = "role";
        logQuery(tableName, "*");
    },

    /**
     * Display contents of employee table to the console
     */
    logEmployees: function() {
        let tableName = "employee";
        logQuery(tableName, "*");
    },

    /**
     * Expand contents of employee table and display it to the console
     * @param {Object} whereClause Key/Value pairs with conditional values
     */
    fullEmployeeReport: function(whereClause = null) {
        let selectStatement = 
            `SELECT employee.first_name, employee.last_name, role.title, 
            FORMAT(role.salary, '###,###') AS salary, 
            CONCAT(manager.first_name, " ", manager.last_name) AS manager_name
            FROM employee
            LEFT JOIN employee AS manager
            ON (employee.manager_id = manager.id)
            LEFT JOIN role
            ON (employee.role_id = role.id)`;
        
        if (whereClause) {
            selectStatement += "\nWHERE ?";
        };

        selectStatement += ";";

        var query;
        
        if (!whereClause) {
            query = app._connection.query(
                    selectStatement,
                    function(err, res) {
                        if (err) throw err;
                        console.table(res);
                    });
        } else {
            query = app._connection.query(
                selectStatement,
                whereClause,
                function(err, res) {
                    if (err) throw err;
                    console.table(res);
                });
        };
    },


    //   * Update employee roles

    /**
     * Update values in employee table
     * @param {Object} setClause Key/Value pairs with values to update
     * @param {Object} whereClause Key/Value pairs with conditional values
     */
    updateEmployees: function(setClause, whereClause) {
        let tableName = "employee";
        updateQuery(tableName, setClause, whereClause);
    },


    // Bonus points if you're able to:

    //   * Update employee managers

    //   * View employees by manager

    //   * Delete departments, roles, and employees

    //   * View the total utilized budget of a department -- ie the combined salaries of all employees in that department


    //  **  Utility Functions

    /**
     * Insert new record into the specified table with the field values specified
     * @param {Text} tableName Name of the table into which to insert the record
     * @param {Object} setClause Key/Value pairs with values to insert
     */
    insertQuery: function(tableName, setClause) {
        console.log(`Inserting a new ${tableName}...\n`);
        var query = app._connection.query(
        "INSERT INTO " + tableName + " SET ?",
            setClause,
        function(err, res) {
            if (err) throw err;
            console.log(`${res.affectedRows} ${tableName}(s) inserted!\n`);
        }
        );
        console.log(query.sql);
    },

    /**
     * Display specified fields of given table to screen using console.table
     * @param {Text} tableName Name of the table to return
     * @param {Text} fieldNames Comma-separated names of fields to return
     */
    logQuery: function(tableName, fieldNames = "*") {
        var query = app._connection.query(
            `SELECT ${fieldNames} FROM ${tableName};`,
            function(err, res) {
                if (err) throw err;
                console.table(res);
            });    
        console.log(query.sql);
    },

    /**
     * Update specified records in given table
     * @param {Text} tableName Name of table to update
     * @param {Object} setClause Key/Value pairs with values to update
     * @param {Object} whereClause Key/Value pairs with conditional values
     */
    updateQuery: function(tableName, setClause, whereClause) {
        var query = app._connection.query(
            `UPDATE ${tableName} SET ? WHERE ?`,
            [
            setClause,
            whereClause
            ],
            function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " records updated!\n");
            }
        );
        console.log(query.sql);
    }
};

