const express = require('express');    
const mongoose = require('mongoose');
const bodyparser = require('body-parser'); 
const cors = require('cors'); 

const categoryController = require('./controller/category_controller'); 
const productController = require('./controller/product_controller');
const userController = require('./controller/user_controller');  
const shippingController = require('./controller/shipping_controller');
const Shipping = require('./model/shipping');
const Product = require('./model/product');

const app = express();
const http = require('http'); 
const server = http.createServer(app)
const io = require('socket.io')(server); 

const PORT = process.env.PORT || 1111;

mongoose.connect(`mongodb://localhost/shopping_cart`, (err) => {
    if (err) {
        console.log('error', err);
    } else {
        console.log('connected'); 
    }
})

app.use((req, res, next) => {
    req.io = io; 
    next();
});
app.use(cors());
app.use(bodyparser.json()); 
app.use(bodyparser.urlencoded()); 
app.use(express.json()); 
app.use(express.urlencoded()); 
app.use('/category', categoryController);
app.use('/product', productController);
app.use('/user', userController);
app.use('/shipping', shippingController); 

io.on('connection', async function (socket) {
    console.log('one user is connected'); 

    const data = await Shipping.find({
        status: false
    });

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
                     
                } 
            }
        }
        console.log(results);
        io.sockets.emit('broadcast', {
            data: data, 
            allData: results
        }); 

        // res.json(results); 
    } catch (error) {
        // res.send(error); 
    }
    
}); 

app.get('/', (req, res, next) => {
    res.send("hello "); 
}); 
 
server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`); 
})

