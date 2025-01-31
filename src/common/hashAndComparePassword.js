const bcrypt = require("bcryptjs");



//* Here we are hashing the password 
async function hashThePassword(passowrd) {
    let hashPassword = await bcrypt.hash(passowrd, 10);
    return hashPassword;
};


//* Here we are comparing the passwords 
async function compareThePassword(passowrd, hashedPassword) {
    let isMatch = await bcrypt.compare(passowrd, hashedPassword);
    return isMatch;
}


module.exports = {
    hashThePassword, 
    compareThePassword
}