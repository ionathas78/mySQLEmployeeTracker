const app = require("../app.js");

const consoleTable = require("console.table");

  //        **      Database Functions

// Build a command-line application that at a minimum allows the user to:

class dbQuery {
    //   * Add departments, roles, employees

    constructor() {};

    /**
     * Insert a new record into the department table
     * @param {Text} departmentName Name of department to add
     */  
    static createDepartment(dbConnection, departmentName) {
        let tableName = "department";
        let setClause = { name: departmentName };
        insertQuery(dbConnection, tableName, setClause);
    };

    /**
     * Insert a new record into the department table
     * @param {Text} roleTitle Name of role to add
     * @param {Number} salary Salary to list under role
     * @param {Number} departmentId ID of department to which the role belongs
     */
    static createRole(dbConnection, roleTitle, salary, departmentId) {
        let tableName = "role";
        let setClause = { title: roleTitle, salary: salary, department_id: departmentId };
        insertQuery(dbConnection, tableName, setClause);
    };

    /**
     * Insert a new record into the employee table
     * @param {Text} firstName First Name of employee
     * @param {Text} lastName Last Name of employee
     * @param {Number} roleId ID of employee's role
     * @param {Number} managerId ID of employee managing the employee
     */  
    static createEmployee(dbConnection, firstName, lastName, roleId, managerId) {
        let tableName = "employee";
        let setClause = { first_name: firstName, last_name: lastName, role_id: roleId, manager_id: managerId }
        insertQuery(dbConnection, tableName, setClause);
    };
    
    
    //   * View departments, roles, employees

    /**
     * Display contents of department table to the console
     */
    static logDepartments(dbConnection) {
        let tableName = "department";
        logQuery(dbConnection, tableName, "*");
    };

    /**
     * Display contents of role table to the console
     */
    static logRoles(dbConnection) {
        let tableName = "role";
        logQuery(dbConnection, tableName, "*");
    };

    /**
     * Display contents of employee table to the console
     */
    static logEmployees(dbConnection) {
        let tableName = "employee";
        logQuery(dbConnection, tableName, "*");
    };

    /**
     * Expand contents of employee table and display it to the console
     * @param {Object} whereClause Key/Value pairs with conditional values
     */
    static fullEmployeeReport(dbConnection, whereClause = null) {
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
            query =  dbConnection.query(
                    selectStatement,
                    function(err, res) {
                        if (err) throw err;
                        console.table(res);
                    });
        } else {
            query =  dbConnection.query(
                selectStatement,
                whereClause,
                function(err, res) {
                    if (err) throw err;
                    console.table(res);
                });
        };
    };


    //   * Update employee roles

    /**
     * Update values in employee table
     * @param {Object} setClause Key/Value pairs with values to update
     * @param {Object} whereClause Key/Value pairs with conditional values
     */
    static updateEmployees(dbConnection, setClause, whereClause) {
        let tableName = "employee";
        updateQuery(dbConnection, tableName, setClause, whereClause);
    };


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
    static insertQuery(dbConnection, tableName, setClause) {
        console.log(`Inserting a new ${tableName}...\n`);
        var query =  dbConnection.query(
        "INSERT INTO " + tableName + " SET ?",
            setClause,
        function(err, res) {
            if (err) throw err;
            console.log(`${res.affectedRows} ${tableName}(s) inserted!\n`);
        }
        );
        console.log(query.sql);
    };

    /**
     * Display specified fields of given table to screen using console.table
     * @param {Text} tableName Name of the table to return
     * @param {Text} fieldNames Comma-separated names of fields to return
     */
    static logQuery(dbConnection, tableName, fieldNames = "*") {
        var query =  dbConnection.query(
            `SELECT ${fieldNames} FROM ${tableName};`,
            function(err, res) {
                if (err) throw err;
                console.table(res);
            });    
        console.log(query.sql);
    }

    /**
     * Update specified records in given table
     * @param {Text} tableName Name of table to update
     * @param {Object} setClause Key/Value pairs with values to update
     * @param {Object} whereClause Key/Value pairs with conditional values
     */
    static updateQuery(dbConnection, tableName, setClause, whereClause) {
        var query =  dbConnection.query(
            `UPDATE ${tableName} SET ? WHERE ?`,
            [
            setClause,
            whereClause
            ],
            function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " records updated!\n");
            };
        );
        console.log(query.sql);
    };

};

module.exports = dbQuery;
