const express = require('express'); 
const router = express.Router(); 
const mongoose = require('mongoose'); 

const Shipping = require('../model/shipping'); 
const Product = require('../model/product'); 

router.get('/', async (req, res, next) => {
    try {
        const results = await Shipping.find(); 

        for (let i = 0; i < results.length; i++) {
            let items = results[i].items; 
            for (let j = 0; j < items.length; j++) {
                let productId = items[j].product; 
                let productQuantity = items[j].quantity; 

                try {
                    const productInfo = await Product.findById(productId).populate('category'); 
                    const newItem = {
                        product: productInfo, 
                        quantity: productQuantity
                    }; 

                    results[i].items[j] = newItem;
                } catch (error) {
                    console.log(error); 
                } 
            }
        }

        res.json(results); 
    } catch (error) {
        res.send(error); 
    }
}); 

router.post('/', (req, res, next) => {
    const newShipping = new Shipping(req.body); 
    newShipping
        .save()
        .then((result) => {
            res.send(result); 
        })
        .catch((err) => {
            res.send(err); 
        }); 
}); 

router.put('/:id', (req, res, next) => {
    Shipping.findByIdAndUpdate(req.params.id, {status: true})
        .exec()
        .then(result => res.send(result))
        .catch(error => res.send(error));
}); 

router.delete('/:id', (req, res, next) => {
    Shipping.findByIdAndDelete(req.params.id)
        .exec()
        .then(result => res.send(result))
        .catch(error => res.send(error)); 
}); 

module.exports = router;