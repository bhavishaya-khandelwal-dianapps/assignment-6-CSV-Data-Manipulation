const express = require("express");
const router = express.Router();


//* Require middlewares 
const middleware = require("../middlewares/auth.js");


//* Require controllers 
const controller = require("../controllers/userController.js");




//* Handle POST request  
router.post("/register", middleware.validateUser, controller.createUser);

router.post("/login", middleware.verifyToken, controller.loginUser);



//* Show sales data of logged in user 
router.get("/login/sales", middleware.verifyToken, controller.showSalesDataOfLoggedInUser);
router.get("/login/sales/:pageNumber", middleware.verifyToken, controller.showSalesDataOfLoggedInUser);
router.get("/login/sales/:pageNumber/:sortOrder", middleware.verifyToken, controller.showSalesDataOfLoggedInUser);



//* Delete API for sales record 
router.delete("/login/sales/delete/:id", middleware.verifyToken, controller.deleteASpecificSalesData);



//* Update API for sales record  
router.patch("/login/sales/update/:id", middleware.verifyToken, controller.updateASpecificSalesData);



//* Add a specific sales record 
router.post("/login/sales/add", middleware.verifyToken, controller.addASpecificSalesData);


//* Export router  
module.exports = router; 