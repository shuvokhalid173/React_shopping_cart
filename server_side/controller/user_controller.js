const express = require('express'); 
const router = express.Router(); 
const mongoose = require('mongoose'); 
const jwt = require('jsonwebtoken');

const User = require('../model/user');

router.post('/signup', async (req, res, next) => {
    const email = req.body.email; 
    
    try {
        const users = await User.find({email: email}); 
        
        if (users.length > 0) {
            res.send('Email already exist. Try with another');    
        } else {
            const newUser = {
                name: req.body.email, 
                email: req.body.email, 
                password: req.body.password, 
                userType: 'guest'
            }; 
            const user = new User(newUser); 
            try {
                const _user = await user.save(); 
                const token = jwt.sign({
                    email: _user.email, 
                    id: _user._id, 
                    userType: _user.userType
                }, "MySecretKeys", {
                    expiresIn: "1h"
                }); 
                res.send({
                    data: _user, 
                    token: token
                }); 
            } catch (error) {
                
            }
        }
    } catch (error) {
        res.send('Auth failed'); 
    }
    
}); 

router.post('/login', async (req, res, next) => {
    const email = req.body.email; 
    const password = req.body.password; 

    try {
        const users = await User.find({email: email}); 
        if (users.length > 0) {
            const user = users[0]; 
            if (user.password == password) { 
                const token = jwt.sign({
                    email: user.email, 
                    id: user._id, 
                    userType: user.userType
                }, "MySecretKeys", {
                    expiresIn: "1h"
                }); 
                res.send({
                    data: user, 
                    token: token
                });  
            } else {
                res.send('password doesn\'t match'); 
            }
        } else {
            res.send('Email doesn\'t match'); 
        }
    } catch (error) {
        res.send('Auth failed'); 
    }
}); 

module.exports = router;