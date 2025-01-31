const express = require("express");
const { config } = require("dotenv");
config();

//* Creating an instance of express 
const app = express();


//* Connect with mongo DB 
require("./config/connection.js");


//* Get PORT from .env file 
const PORT = process.env.PORT; 


//* Get routes 
const router = require("./routers/routes.js");




//* Define necessary middlewares 
app.use(express.urlencoded({
    extended : true
}));

app.use(express.json());

app.use(router);




//* Listen the server  
const server = app.listen(PORT, () => {
    console.log(`Server is listening on PORT number ${PORT}`);
    // require("./common/watch.js").pushTheDataIntoSalesCollection();
    require("./common/watch.js");
});