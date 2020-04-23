const uiInput = require("./user_modules/uiInput.js");
// const db = require("./user_modules/database.js");
const encryption = require("./user_modules/encryption.js");

const mySQL = require("mysql");
const inquirer = require("inquirer");

const UserAccess = {
    "UNAUTHORIZED": -1,
    "UNDEFINED": 0,
    "USER": 1,
    "SUPERUSER": 2,
    "MANAGER": 4,
    "ADMIN": 8
};
Object.freeze(UserAccess);

var _connection = mySQL.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "EmployeeTracker"
  });

let _userName = null; 
let _userAccess = -1;
  
  _connection.connect(function(err) {
    if (err) throw err;
    //  ("connected as id " + _connection.threadId + "\n");
    getUser();
  });

function getUser() {
    inquirer
        .prompt(
            {
                name: "userName",
                type: "input",
                message: "Please enter username (or leave blank to login as guest):"
            }
        ).then(response => {
            let userName = response.userName;

            if (!userName || userName == "") {
                _userName = "guest";
                _userAccess = UserAccess.USER;
                uiInput.initialMenu();
            } else {
                _userName = userName;
                queryUserPassword();
            };
        });  
};

function queryUserPassword() {
    let sqlQuery = `
                    SELECT password
                    FROM EmployeeTracker.employee
                    WHERE user_name = "${_userName}";
                    `;
    _connection.query(sqlQuery, (err, res) => {
        if (err) throw err;
        const { password } = res;
        // console.log(password); 

        if (!password) {
            getNewPassword();
        } else {
            validateUser(password);
        };
    });
};

function validateUser(storedHash) {
        inquirer
            .prompt(
                {
                    name: "userPassword",
                    type: "password",
                    message: "Please enter password:"
                }
            ).then(response => {
                let validatesTrue = encryption.validatePassword(storedHash, response.userPassword);
                if (validatesTrue) {
                    queryUserAccess();
                } else {
                    console.log("Invalid login!");
                    getUser();
                };
            });
};

function queryUserAccess() {
    let sqlQuery = `
                    SELECT access
                    FROM EmployeeTracker.employee
                    WHERE user_name = "${_userName}";
                    `;
    app._connection.query(sqlQuery, (err, res) => {
        if (err) throw err;
        const { access } = res;

        _userAccess = access;
        uiInput.initialMenu();
    });
};

function getNewPassword() {
    inquirer
    .prompt(
        {
            name: "userPassword0",
            type: "password",
            message: "First time login. Please enter new password:"
        },
        {
            name: "userPassword1",
            type: "password",
            message: "Confirm password:"
        }
    ).then(response => {
        if (response.userPassword0 != response.userPassword1) {
            console.log("Passwords must match!");
        } else {
            let passHash = encryption.encryptPassword(response.userPassword0);
            let sqlQuery = `
                    UPDATE EmployeeTracker.employee
                    SET password = "${passHash}"
                    WHERE user_name = "${_userName}";
                `;
            _connection.query(sqlQuery, (err, res) => {
                if (err) throw err;

                // console.log(res);
                queryUserAccess();
            })
            .catch(err => {
                throw err;
            });
        };
    });
};

function endSession() {

    connection.end();    
};

//  **  Logic

getUser();

// connection.end();

