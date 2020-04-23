const orm = require("./support/orm.js");

module.exports = {

// Build a command-line application that at a minimum allows the user to:

//   * Add departments, roles, employees

    addDepartment: function(departmentName) {
        let tableName = "departments";
        let values = {
            name: departmentName
        };
        orm.addQuery(tableName, values);
    },

    addRole: function(roleTitle, salary, departmentId) {
        let tableName = "roles";
        let values = {
            title: roleTitle,
            salary: salary,
            department_id: departmentId
        };
        orm.addQuery(tableName, values);
    },

    addEmployee: function(userName, firstName, lastName, roleId, managerId) {
        let tableName = "employees";
        let values = {
            user_name: userName,
            first_name: firstName,
            last_name: lastName,
            role_id: roleId,
            manager_id: managerId
        };
        orm.addQuery(tableName, values);
    },

//   * View departments, roles, employees

    reportDepartments: function() {
        let tableName = "departments";
        let fieldNames = "name";
        orm.selectQuery(tableName, fieldNames);
    },

    reportRoles: function() {
        let tableName = "roles";
        let joinData = {
                joinTable: "departments",
                tableField: "department_id",
                joinField: "id"
            };
        let fieldNames = ["title", "salary", "departments.name AS department"];
        orm.selectJoinQuery(tableName, fieldNames, null, joinData);
    },

    reportEmployees: function() {
        let tableName = "employees";
        let primaryJoinData = {
                joinTable: "roles",
                tableField: "role_id",
                joinField: "id"
            };
        let secondaryJoinData = {
                joinTable: "employees",
                joinAlias: "managers",
                tableField: "manager_id",
                joinField: "id"
            };
        let fieldNames = ["employees.user_name", "employees.first_name", "employees.last_name", "roles.title AS role", "managers.id AS manager"];
        orm.selectJoinQuery(tableName, fieldNames, null, null, true, primaryJoinData, secondaryJoinData);
    },

//   * Update employee roles

    updateEmployeeRole: function(employeeId, newRole) {
        let tableName = "employees";
        let setClause = {
            role_id: newRole
        };
        let whereClause = {
            id: employeeId
        };
        orm.updateQuery(tableName, setClause, whereClause);
    },

// Bonus points if you're able to:

//   * Update employee managers

    updateEmployeeManager: function (employeeId, newManager) {
        let tableName = "employees";
        let setClause = {
            manager_id: newManager
        };
        let whereClause = {
            id: employeeId
        };
        orm.updateQuery(tableName, setClause, whereClause);
    },

//   * View employees by manager

    reportEmployeesByManager: function(managerId) {
        let tableName = "employees";
        let primaryJoinData = {
                joinTable: "roles",
                tableField: "role_id",
                joinField: "id"
            };
        let secondaryJoinData = {
                joinTable: "employees",
                joinAlias: "managers",
                tableField: "manager_id",
                joinField: "id"
            };
        let fieldNames = ["employees.user_name", "employees.first_name", "employees.last_name", "roles.title AS role", "managers.id AS manager"];
        let whereClause = {
            "employees.manager_id": managerId
        };
        orm.selectJoinQuery(tableName, fieldNames, whereClause, null, true, primaryJoinData, secondaryJoinData);
    },

//   * Delete departments, roles, and employees

    deleteDepartment: function(departmentId) {
        let tableName = "departments";
        let whereClause = {
            id: departmentId
        };
        orm.deleteQuery(tableName, whereClause);
    },

    deleteRole: function(roleId) {
        let tableName = "roles";
        let whereClause = {
            id: roleId
        };
        orm.deleteQuery(tableName, whereClause);
    },

    deleteEmployee: function(employeeId) {
        let tableName = "employees";
        let whereClause = {
            id: employeeId
        };
        orm.deleteQuery(tableName, whereClause);
    },

//   * View the total utilized budget of a department -- ie the combined salaries of all employees in that department

    sumSalariesByDepartment: function(departmentId) {
        let tableName = "employees";
        let primaryJoinData = {
                joinTable: "roles",
                tableField: "role_id",
                joinField: "id"
            };
        let fieldNames = ["Count(employees.id) AS 'Employees'", "Sum(roles.salary) AS 'Total Salary'"];
        let whereClause = {
            "roles.department_id": departmentId
        };
        orm.aggregateJoinQuery(tableName, fieldNames, whereClause, null, null, true, primaryJoinData);
    }
};
