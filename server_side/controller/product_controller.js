const express = require('express'); 
const router = express.Router(); 
const mongoose = require('mongoose'); 
const multer = require('multer'); 
const authUserChecker = require('../middleware/authUserChecker'); 
const adminChecker = require('../middleware/adminChecker'); 

const Product = require('../model/product'); 

const storage = multer.diskStorage ({
    destination: function (req, file, cb) {
        cb(null, '../public/assets'); 
    }, 
    filename: function (req, file, cb) {
        cb(null, file.originalname); 
    }
})

const upload = multer({storage: storage});

router.get('/', async (req, res, next) => {
    try {
        const result = await Product.find().populate('category');
        res.json(result); 
    } catch (ex) {
        console.log(ex); 
    }
});

router.get('/:id', async (req, res, next) => {
    try { 
        let result = await Product.findById(req.params.id).populate('category'); 
        res.json(result);
    } catch (ex) {
        res.send('no'); 
    }
});

router.post('/', upload.single('file'), async (req, res, next) => {
    // const token = req.header('x-auth-token');
    // console.log(token);  
    let product = {}; 
    if (!req.file) {
        product = {
            name: req.body.name, 
            price: req.body.price, 
            category: req.body.categoryId 
        }; 
    } else {
        product = {
            image: req.file.originalname,
            name: req.body.name, 
            price: req.body.price, 
            category: req.body.categoryId
        }; 
    }
    let id = req.body.id; 
    if (!id) {
        /// insert to databse
        const newProduct = new Product(product); 
        newProduct.save().then((result) => {
            res.send(result)
        })
    } else {
        /// update the database
        product['_id'] = id; 
        Product.findByIdAndUpdate(id, product).then(result => res.send(result)); 
    }
}); 

router.delete('/:id', [authUserChecker, adminChecker], (req, res, next) => {
    Product.findByIdAndDelete(req.params.id).then(respose => res.send(response));  
}); 

module.exports = router;