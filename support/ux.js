const inquirer = require("inquirer");
const database = require("./database.js");
const main = require("../employeeTracker.js");

module.exports = {
    startMenu: function(user) {
        let firstName = user.firstName;
        console.log(`Hello, ${firstName}!`);
        console.log("Start!");
    }

};

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

