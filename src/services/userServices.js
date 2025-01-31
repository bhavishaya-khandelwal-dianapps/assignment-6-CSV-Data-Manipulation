const bcrypt = require("bcryptjs");


//* Require "User" collection 
const User = require("../models/usersCollection.js");
const Sale = require("../models/salesCollection.js");


//* Require hashPassword and comparePassword function 
const hash = require("../common/hashAndComparePassword.js");


async function registerNewUser(data) {

    //* Hash the passowrd  
    let password = data.password; 
    const hashPassword = await hash.hashThePassword(password);
    data.password = hashPassword;

    const newUser = new User(data);
    const result = await newUser.save();
    return result;
    
}



async function findUser(data, pageNumber=1, sortOrder="I") {
    let email = data.email;
    email = email.trim();
    let password = data.password;
    let so = 1;
    if(sortOrder == "D") so = -1;


    //* Find userData 
    const userData = await User.findOne({ email });

    //* If we not get userData, it means user provided wrong credentials 
    if(userData == null) return "ie";
    

    //* If the password is not matching then we return false  
    const strongPassword = userData.password;
    
    const isMatch = await hash.compareThePassword(password, strongPassword);
    if(isMatch == false) return "ip";


    const userId = (userData._id).toString();

    const result = await Sale.find({ userId }).skip((pageNumber - 1) * 10).limit(10).sort({ region : so });

    return result;
};



//* Verify email and password  
async function verifyEmailAndPassword(email, password) {
    try {
        const userData = await User.findOne({ email });
        if(userData == null) return false;

        const isMatch = await hash.compareThePassword(password, userData.password);
        if(isMatch == false) return false; 

        return true;
    }
    catch(error) {
        console.log("Problem in verifying email and password, Error =", error);
    }
};




//* Delete a specific sale record of a logged in user 
async function deleteASpecificSaleRecord(id) {
    const deleteResult = await Sale.findByIdAndDelete({ _id : id });
    console.log('deleteResult :', deleteResult);
    if(deleteResult == null) return "";
    return deleteResult;
};




//* Update a specific sale record of a logged in user  
async function updateASpecificSalesData(id, toUpdate) {
    const updateResult = await Sale.findByIdAndUpdate({ _id : id }, { $set : toUpdate });
    console.log("Update Result =", updateResult);
    if(updateResult == null) return "";
    return updateResult;
};



//* Add a specific sales record 
async function addASpecificSalesData(email, dataToBeAdded) {
    //* Before adding the data, we need to get userID and append it also to the actual data 
    const userData = await User.findOne({ email });
    console.log("UserData =", userData);
    
    const userId = (userData._id).toString();
    console.log("User Id =", userId);

    dataToBeAdded.userId = userId;
    console.log("Data To Be Added =", dataToBeAdded);

    const saveTheData = new Sale(dataToBeAdded);
    const addedData = await saveTheData.save();
    console.log("Added Data =", addedData);
    return addedData;
};


module.exports = {
    registerNewUser, 
    findUser, 
    verifyEmailAndPassword,
    deleteASpecificSaleRecord, 
    updateASpecificSalesData, 
    addASpecificSalesData
}