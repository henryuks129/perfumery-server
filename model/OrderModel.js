const mongoose = require('mongoose');
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    mobile:{
        type: String,
        required: true,
        maxLength: 11
    },
    address:{
        type: String,
        required: true
    },
    paymentMode:{
        type: String,
        enum:['cash','transfer'],
        required:true
    }
},{timestamps: true})

// Export the model
const ORDER = mongoose.model('Order',OrderSchema);
module.exports = ORDER