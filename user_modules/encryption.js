const bcrypt = require("bcrypt");

const  _saltRounds = 10;

function encryptPassword(userPassword) {
    bcrypt
        .genSalt( _saltRounds)
        .then(salt => bcrypt.hash(userPassword, salt))
        .then(returnHash => returnHash)
        .catch(err => { throw err });
    
    return returnHash;
};

function validatePassword(userPassword, storedHash) {
    bcrypt  
        .compare(userPassword, storedHash)
        .then(returnValue => returnValue)
        .catch(err => { throw err });
    
    // return returnValue;
}

module.exports = { encryptPassword, validatePassword };

//      Example code by Dan Arias 2018, taken from "Hashing in Action: Understanding bcrypt" on the Auth0 website.
//          https://auth0.com/blog/hashing-in-action-understanding-bcrypt/

// const  saltRounds = 10;
// const plainTextPassword1 = "DFGh5546*%^__90";

//  Technique 1:
// bcrypt
//   .genSalt( saltRounds)
//   .then(salt => {
//     console.log(`Salt: ${salt}`);

//     return bcrypt.hash(plainTextPassword1, salt);
//   })
//   .then(hash => {
//     console.log(`Hash: ${hash}`);

//     // Store hash in your password DB.
//   })
//   .catch(err => console.error(err.message));

//  Technique 2:
// bcrypt
//   .hash(plainTextPassword1,  saltRounds)
//   .then(hash => {
//     console.log(`Hash: ${hash}`);

//     // Store hash in your password DB.
//   })
//   .catch(err => console.error(err.message));

