const mongoose = require("mongoose");
const URL = process.env.URL;

mongoose.connect(URL)
.then(() => {
    console.log("Connection successful, go ahead");
})
.catch((error) => {
    console.log(`Error occur while connecting to mongoDB and the error = ${error}`);
});