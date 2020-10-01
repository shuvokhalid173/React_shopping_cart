const mongoose = require('mongoose'); 

const itemSchema = new mongoose.Schema({
    product: {
        required: true, 
        type: String
    }, 
    quantity: {
        required: true, 
        type: Number
    }
}); 

const shippingSchema = new mongoose.Schema({
    city: {
        type: String
    }, 
    street: { 
        type: String
    }, 
    phone: {
        required: true, 
        type: String
    }, 
    date: {
        required: true, 
        type: String
    }, 
    items: [itemSchema], 
    user: {
        type: String, 
        required: true
    }, 
    grandTotal: {
        type: Number, 
        required: true
    }, 
    status: {
        type: Boolean, 
        required: true
    }
}); 

module.exports = mongoose.model('Shipping', shippingSchema, 'shipping'); 