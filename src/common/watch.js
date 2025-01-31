const cron = require("node-cron");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");


//* Get "Sale" collection 
const Sale = require("../models/salesCollection.js");


//* get filepath  
let filePath = path.join(__dirname, "../files/sales.csv");
let jsonFilePath = path.join(__dirname, "../salesData/output.json");
let FLAG = 2;


//* Generate userID  
let userIDs = ["679b2f0d21e0b737cb3496ed", "679b3139030dda47821b07b1", "679b64200a10c2b1096a9ea0"];
function generateUserId() {
    let index = Math.floor(Math.random() * userIDs.length);
    return userIDs[index];
}



let batch = [];
let batchSize = 0;

//* Schedule the task to run every minute 
cron.schedule("* * * * * *", async () => {

    //* Check is the file exist if it exist then push it's data into dataBase
    if((fs.existsSync(filePath)) && (FLAG == 2)) {
        
        //* It's very important to mark FLAG as 1 because the cron scheduler is running every second
        FLAG = 1;
        fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", async (chunk) => {
            const data = {
                userId : generateUserId(), 
                region : chunk["Region"], 
                country : chunk["Country"], 
                itemType : chunk["Item Type"],
                salesChannel : chunk["Sales Channel"],
                orderPriority : chunk["Order Priority"],
                orderDate : chunk["Order Date"],
                orderId : chunk["Order ID"],
                shipDate : chunk["Ship Date"], 
                unitsSold : chunk["Units Sold"],
                unitPrice : chunk["Unit Price"],
                unitCost : chunk["Unit Cost"],
                totalRevenue : chunk["Total Revenue"],
                totalCost : chunk["Total Cost"],
                totalProfit : chunk["Total Profit"] 
            };

            if(batchSize >= 500) {
                const result = Sale.insertMany(batch, {
                    ordered: false
                });
                console.log("Result =", result);
                batch = [];
                batchSize = 0;
            }
            batch.push(data);
            batchSize++;

        })
        .on("end", async () => {
            //* Now, when the whole data is readed from "sales.csv" file that means now we no longer neededd this file, so we delete that file 
            fs.unlink(filePath, () => {
                console.log("Sales.csv file deleted successfully");
            });  

            //* Again update FLAG so that next time any "sales.csv" file come we can get it's data
            FLAG = 2;

        })
        .on("error", (err) => {
            fs.unlink(filePath, () => {
                console.log("Sales.csv file deleted successfully");
            }); 
            FLAG = 2;
        })
    }

});