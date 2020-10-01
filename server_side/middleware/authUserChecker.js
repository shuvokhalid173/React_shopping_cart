const jwt = require('jsonwebtoken'); 

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token'); 
    console.log(token); 
    if (!token) {
        return res
            .status(401)
            .send("Access denied. No token provided.");
    }

    try {
        const decoded = jwt.verify(token, "MySecretKeys");
        req.user = decoded; 
        next();  
    } catch (error) {
        res
            .status(400)
            .send('Invalid token'); 
    }
}