const inquirer = require("inquirer");
const database = require("./database.js");
const connection = require("./connection.js");
const tracker = require("../employeeTracker.js");

let _currentUser = {};
let _employeeAccess = {};
let _targetUser = {};

const _CHOICE_LOGOFF = "Logoff";
const _CHOICE_EXIT = "Exit";

module.exports = { startMenu };

//      **      Primary Menu Functions

function startMenu(user = null, employeeAccess = null) {
    const CHOICE_EMPMENU = "Employee Menu";
    const CHOICE_MGRMENU = "Manager Menu";
    const CHOICE_ADMINMENU = "Administrator Menu";

    if (user) {
        _currentUser = user;
    };
    if (employeeAccess) {
        _employeeAccess = employeeAccess;
    }

    let varName = "userChoice";
    let type = "list";
    let prompt = `Hello, ${_currentUser.name},\nWhat would you like to do today?`;
    let choices = [];

    let access = _currentUser.access;
    if (access >= _employeeAccess.USER) {
        choices.push(CHOICE_EMPMENU);
    };
    if (access >= _employeeAccess.MANAGER) {
        choices.push(CHOICE_MGRMENU);
    };
    if (access >= _employeeAccess.ADMINISTRATOR) {
        choices.push(CHOICE_ADMINMENU);
    };

    choices.push(_CHOICE_LOGOFF);
    choices.push(_CHOICE_EXIT);

    let props = new InquirerProps(varName, prompt, type, choices);
    inquirer
        .prompt(props)
        .then(function (res) {
            choices = null;

            switch (res[varName]) {
                case CHOICE_EMPMENU:
                    employeeMenu();
                    break;
                case CHOICE_MGRMENU:
                    managerMenu();
                    break;
                case CHOICE_ADMINMENU:
                    administratorMenu();
                    break;
                case _CHOICE_LOGOFF:
                    tracker.logoff();
                    break;
                case _CHOICE_EXIT:
                    tracker.exitTracker();
                    break;
                default:
                    console.log("Unrecognized input: '" + res[varName] + "'!");
            };
        })
        .catch(err => { throw err });  
};
    
function employeeMenu() {
    const CHOICE_DEPTREPORT = "Department Report";
    const CHOICE_ROLEREPORT = "Role Report";
    const CHOICE_EMPREPORT = "Employee Report";
    const CHOICE_EMPBYMGRREPORT = "Employee by Manager Report";

    let varName = "userChoice";
    let type = "list";
    let prompt = `Hello, ${_currentUser.name},\nSelect an employee function:`;
    let choices = [];

    let access = _currentUser.access;
    if (access >= _employeeAccess.USER) {
        choices.push(CHOICE_DEPTREPORT);
        choices.push(CHOICE_ROLEREPORT);
        choices.push(CHOICE_EMPREPORT);
    };
    if (access >= _employeeAccess.MANAGER) {
        choices.push(CHOICE_EMPBYMGRREPORT);
    };
    // if (access >= _employeeAccess.ADMINISTRATOR) {
    // }
    choices.push(new inquirer.Separator());
    choices.push(_CHOICE_LOGOFF);
    choices.push(_CHOICE_EXIT);

    let props = new InquirerProps(varName, prompt, type, choices);
    inquirer
        .prompt(props)
        .then(function (res) {
            choices = null;

            switch (res[varName]) {
                case CHOICE_DEPTREPORT:
                    database.reportDepartments(employeeMenu);
                    break;
                case CHOICE_ROLEREPORT:
                    database.reportRoles(employeeMenu);
                    break;
                case CHOICE_EMPREPORT:
                    database.reportEmployees(employeeMenu);
                    break;
                case CHOICE_EMPBYMGRREPORT:
                    reportEmployeeByManager(employeeMenu);
                    break;
                case _CHOICE_LOGOFF:
                    tracker.logoff();
                    break;
                case _CHOICE_EXIT:
                    tracker.exitTracker();
                    break;
                default:
                    console.log("Unrecognized input: '" + res[varName] + "'!");
            };
        })
        .catch(err => { throw err });  
};

function managerMenu() {    let varName = "userChoice";
    let type = "list";
    let prompt = `Hello, ${_currentUser.name},\nWhat would you like to do today?`;
    let choices = [];

    let access = _currentUser.access;
    if (access >= _employeeAccess.USER) {
        choices.push("0");
    };
    if (access >= _employeeAccess.MANAGER) {
        choices.push("1");
    };
    if (access >= _employeeAccess.ADMINISTRATOR) {
        choices.push("2");
    }

    choices.push(_CHOICE_LOGOFF);
    choices.push(_CHOICE_EXIT);

    let props = new InquirerProps(varName, prompt, type, choices);
    inquirer
        .prompt(props)
        .then(function (res) {
            choices = null;

            switch (res[varName]) {
                case "":
                    break;
                case _CHOICE_LOGOFF:
                    tracker.logoff();
                        break;
                    case _CHOICE_EXIT:
                    tracker.exitTracker();
                    break;
                default:
                    console.log("Unrecognized input: '" + res[varName] + "'!");
            };
        });  
};
function administratorMenu() {console.log(`Hello, ${_currentUser.name}! Administrator Menu:`)};
     
function menuType() {
    let varName = "userChoice";
    let type = "list";
    let prompt = `Hello, ${_currentUser.name},\nWhat would you like to do today?`;
    let choices = [];

    let access = _currentUser.access;
    if (access >= _employeeAccess.USER) {
        choices.push("0");
    };
    if (access >= _employeeAccess.MANAGER) {
        choices.push("1");
    };
    if (access >= _employeeAccess.ADMINISTRATOR) {
        choices.push("2");
    }

    choices.push(_CHOICE_LOGOFF);
    choices.push(_CHOICE_EXIT);

    let props = new InquirerProps(varName, prompt, type, choices);
    inquirer
        .prompt(props)
        .then(function (res) {
            choices = null;

            switch (res[varName]) {
                case "":
                    break;
                case _CHOICE_LOGOFF:
                    tracker.logoff();
                        break;
                    case _CHOICE_EXIT:
                    tracker.exitTracker();
                    break;
                default:
                    console.log("Unrecognized input: '" + res[varName] + "'!");
            };
        });  
};

//      **      Secondary Menu Functions


//     Build a command-line application that at a minimum allows the user to:

//     * Add departments, roles, employees
  
function reportEmployeeByManager() {
    let choices = [];
    let sql = `SELECT employees.manager_id, managers.first_name, managers.last_name 
                FROM employees 
                LEFT JOIN employees AS managers 
                ON employees.manager_id = managers.id 
                GROUP BY employees.manager_id
                HAVING (Count(employees.manager_id) > 0);`;
    connection.query(sql, function (err, data) {
        if (err) throw err;
        // console.log(data);
        for (let i = 0; i < data.length; i++) {
            let record = data[i];
            let obj = {
                name: record.first_name + " " + record.last_name,
                value: record.manager_id,
                short: record.first_name
            };
            choices.push(obj);
        };

        if (choices.length == 0) {
            console.log("No managers to report!");
            employeeMenu();

        } else {
            let varName = "userChoice";
            let type = "list";
            let prompt = `Report employees for which manager?`;
            let props = new InquirerProps(varName, prompt, type, choices);
            
            // console.log(props);
            inquirer    
                .prompt(props)
                .then(function (response) {
                    // console.log(response);
                    choices = null;
                    database.reportEmployeesByManager(response.userChoice, employeeMenu);
                })
                .catch(err => { throw err });
        };
    });
};

//     * View departments, roles, employees

//     * Update employee roles
  
//   Bonus points if you're able to:
  
//     * Update employee managers
  
//     * View employees by manager
  
//     * Delete departments, roles, and employees
  
//     * View the total utilized budget of a department -- ie the combined salaries of all employees in that department
  



//      **      Utility Functions

function InquirerProps(variableName, promptMessage, promptType = "input", promptChoices = null, promptDefault = null) {
    return {
        name: variableName,
        type: promptType,
        message: promptMessage,
        choices: promptChoices,
        default: promptDefault,
    }
}


//      **      Logic

