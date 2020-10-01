const express = require('express'); 
const router = express.Router(); 
const mongoose = require('mongoose'); 

const Category = require('../model/category');


router.get('/', (req, res, next) => {
    Category.find()
        .exec()
        .then((categories) => {
            console.log(categories); 
            res.json(categories); 
        })
        .catch((err) => {
            console.log(err);
        })
});

module.exports = router;