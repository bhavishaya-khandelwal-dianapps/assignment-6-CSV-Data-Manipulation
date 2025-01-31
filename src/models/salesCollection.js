const mongoose = require("mongoose");


//* Define "Sales" schema  
const salesSchema = new mongoose.Schema({
    userId : {
        type : String, 
        required : true 
    },
    region : {
        type : String, 
        required : true 
    },
    country : {
        type : String,  
        required : true 
    }, 
    itemType : {
        type : String, 
        required : true 
    },
    salesChannel : {
        type : String,
        required : true  
    },
    orderPriority : {
        type : String, 
        required : true 
    },
    orderDate : {
        type : Date, 
        required : true 
    },
    orderId : {
        type : Number,  
        required : true
    },
    shipDate : {
        type : String,
        required : true  
    }, 
    unitsSold : {
        type : Number, 
        required : true
    },
    unitPrice : {
        type : mongoose.Types.Decimal128, 
        required : true
    },
    unitCost : {
        type : mongoose.Types.Decimal128, 
        required : true
    },
    totalRevenue : {
        type : mongoose.Types.Decimal128,  
        required : true
    },
    totalCost : {
        type : mongoose.Types.Decimal128, 
        required : true
    },
    totalProfit : {
        type : mongoose.Types.Decimal128, 
        required : true
    }
});




//* Create "Sale" collection 
const Sale = new mongoose.model("Sale", salesSchema);




//* Export "Sale" collection 
module.exports = Sale;