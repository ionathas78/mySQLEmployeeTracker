const inquirer = require("inquirer");

const support = require("./support/");

const EmployeeAccess = {
    UNAUTHORIZED: -1,
    UNDEFINED: 0,
    USER: 1,
    SUPERUSER: 2,
    MANAGER: 3,
    ADMIN: 4
};
Object.freeze(EmployeeAccess);

const _user = {
    id: -1,
    access: -1,
    firstName: ""
};
const _INFORM_ONINVALIDUSER = true;

function getUserName() {
    let props = {
        type: "input",
        name: "userName",
        message: "Please enter username (or leave blank to login as guest):"
    };

    inquirer
        .prompt(props)
        .then(function (res) {
            support.connection.query(`SELECT id, password, access, first_name FROM employees WHERE user_name = '${res.userName}'`, function (err, res) {
                if (err) throw err;
                // console.log(res);

                if (!res[0]) {
                    //  username doesn't exist in DB. For security reasons, it would be better to go ahead to the password as if everything were fine.
                    if (_INFORM_ONINVALIDUSER) {
                        console.log("Invalid user name!");
                        getUserName();
                    } else {
                        validatePassword();
                    };
                };

                _user.id = res[0].id;
                _user.access = res[0].access;
                _user.firstName = res[0].first_name;

                if (!res[0].password) {
                    setNewPassword();
                } else {
                    validatePassword();
                };
            });
        })
        .catch(function (err) {
            throw err;
        });
};

function setNewPassword() {
    let props0 = {
        type: "password",
        name: "userPass0",
        message: `This looks like your first login. Please create a password:`
    };
    let props1 = {
        type: "password",
        name: "userPass1",
        message: `Confirm password:`
    };

    inquirer
        .prompt([props0, props1])
        .then(function (res) {
            if (res.userPass0 != res.userPass1) {
                console.log("Passwords must match!");
                setNewPassword();
            } else {
                //          Admittedly, it'd be nice to have some password strength evaluation here...

                let hash = support.encryption.encryptPassword(_user.id, res.userPass0);
                console.log("Password updated!");
                Object.freeze(_user);
                support.ux.startMenu(_user);
            }
        })
};

function validatePassword() {
    let props = {
        type: "password",
        name: "userPass",
        message: `Please enter password:`
    };

    inquirer
        .prompt(props)
        .then(function (res) {
            let userId = -1;
            if (_user) {
                userId = _user.id;
            }; 
            support.encryption.validatePassword(userId, res.userPass, (err, res) => {
                if (err) throw err;
                if (!res) {
                    if (!_INFORM_ONINVALIDUSER) {
                        console.log("Invalid username or password!");
                    } else {
                        console.log("Invalid password!");
                    };

                    _user.id = -1;
                    _user.firstName = "";
                    _user.access = -1;

                    getUserName();
                    
                } else {
                    Object.freeze(_user);
                    support.ux.startMenu(_user);
                };
            });

        })
}

getUserName();

