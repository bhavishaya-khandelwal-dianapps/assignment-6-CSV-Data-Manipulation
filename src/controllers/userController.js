const jwt = require("jsonwebtoken");

//* Require services  
const service = require("../services/userServices.js");
const User = require("../models/usersCollection.js");


//* This function is creating a new user 
async function createUser(req, res) {
    try {
        const body = {
            name : req.user.name, 
            email : req.user.email,
            role : req.user.role, 
            isActive : req.user.isActive, 
            password : req.user.password 
        }

        //* If any of the field in not mentioned by the client 
        if(!body.name || !body.email || !body.role || !body.isActive || !body.password) {
            res.status(400).send("All fields are necessary, please provide all fields");
        }
        

        const result = await service.registerNewUser(req.body);
        res.status(201).send({ 
            message : "User Created Successfully", 
            token : req.token, 
            body : result
        });
    }
    catch(error) {
        res.status(500).send("OOPs, user creation failed");
    }
};



//* This function is used to login a user 
async function loginUser(req, res) {
    try {
        const body = {
            email : req.body.email, 
            password : req.body.password 
        }
        
        if(!body.email || !body.password) {
            return res.status(400).send("Please provide your correct email and password");
        }
        
        req.user = body;

        const result = await service.findUser(req.user);
        console.log("Result =", result);
        if(result == "ip") return res.status(400).send("Please provide your correct email and password");
        else 
        res.status(200).send("User logged in successfully");
    }
    catch(error) {
        res.status(400).send(`${error}`);
    }
};



//* This function is used to show sales data of a logged in user  
async function showSalesDataOfLoggedInUser(req, res) {
    try {
        //* Verify credentials of the user 
        let sortOrder = req.params.sortOrder;
        let pageNumber = req.params.pageNumber; 
        
        const email = req.body.email;
        const password = req.body.password; 
        if(!email || !password) {
            return res.status(400).send("Please provide email and password");
        } 
        
        const result = await service.findUser(req.body, pageNumber, sortOrder);
        if(result == "ie" || result == "ip") {
            return res.status(400).send("Wrong credentials");
        }
        else {
            return res.status(200).send(result);
        }
    }
    catch(error) {
        res.status(400).send(`${error}`);
    }
};




//* This function is going to delete a specific entry of a logged in user  
async function deleteASpecificSalesData(req, res) {
    try {
        let id = req.params.id;
        console.log("Id =", id);
        
        const email = req.body.email;
        const password = req.body.password; 
        if(!email || !password) {
            res.status(400).send("Please provide email and password");
        } 

        //* Verify email and password 
        const isValid = await service.verifyEmailAndPassword(email, password);

        //* If isValid == true then delete that entry from the user's sales table  
        if(isValid == true) {
            const deleteResult = await service.deleteASpecificSaleRecord(id);
            if(!deleteResult) {
                return res.status(200).send("Sorry, data with this id not exist");
            }
            else {
                return res.status(200).send({
                    message : `Data with ID = ${id} is deleted successfully`, 
                    deleteResult : deleteResult
                });
            }
        }
        else {
            return res.status(400).send("Please provide correct login details");
        }
    }
    catch(error) {
        res.status(400).send(`${error}`);
    }
};




//* This function is going to delete a specific entry of a logged in user  
async function updateASpecificSalesData(req, res) {
    try {
        let id = req.params.id;
        console.log("Id =", id);
        const body = req.body;
        
        const email = body[0].email;
        const password = body[0].password;

        const toUpdate = body[1];
        console.log("To Update =", toUpdate);

        const isValid = await service.verifyEmailAndPassword(email, password);
        if(isValid == false) {
            return res.status(400).send("Please provide correct login details");
        }
        else {
            const updatedResult = await service.updateASpecificSalesData(id, toUpdate);
            if(!updatedResult) {
                return res.status(200).send("Sorry, data with this id not exist");
            }
            else {
                return res.status(200).send({
                    message : `Data with ID = ${id} is updated successfully`, 
                    updatedResult : updatedResult
                });
            }
        }

    }
    catch(error) {
        res.status(400).send(`${error}`);
    }
};






// {
//     "_id": "679c6877967885146aedcee0",
//     "userId": "679b2f0d21e0b737cb3496ed",
//     "region": "Asia",
//     "country": "China",
//     "itemType": "Vegetables",
//     "salesChannel": "Offline",
//     "orderPriority": "M",
//     "orderDate": "2014-11-21T18:30:00.000Z",
//     "orderId": 583712899,
//     "shipDate": "12/19/2014",
//     "unitsSold": 2473,
//     "unitPrice": {
//         "$numberDecimal": "154.06"
//     },
//     "unitCost": {
//         "$numberDecimal": "90.93"
//     },
//     "totalRevenue": {
//         "$numberDecimal": "380990.38"
//     },
//     "totalCost": {
//         "$numberDecimal": "224869.89"
//     },
//     "totalProfit": {
//         "$numberDecimal": "156120.49"
//     },
//     "__v": 0
// }



//* Add a specific sales data 
async function addASpecificSalesData(req, res) {
    try {
        const body = req.body;

        const email = body[0].email;
        const password = body[0].password;
        const dataToBeAdded = body[1];

        const isValid = await service.verifyEmailAndPassword(email, password);
        if(isValid == false) {
            return res.status(400).send("Please provide correct login details");
        }
        else {
            const addResult = await service.addASpecificSalesData(email, dataToBeAdded);
            if(!addResult) {
                return res.status(200).send("Please provide all the fields as all the fields are necessary");
            }
            else {
                return res.status(200).send({
                    message : `Record added successfully`, 
                    addResult : addResult
                });
            }
        }
    }
    catch(error) {
        res.status(500).send(`${error}`);
    }
};



module.exports = {
    createUser, 
    loginUser,
    showSalesDataOfLoggedInUser, 
    deleteASpecificSalesData, 
    updateASpecificSalesData, 
    addASpecificSalesData
}