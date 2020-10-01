const jwt = require('jsonwebtoken'); 

module.exports = (req, res, next) => {
    
  if (req.user.userType != 'admin') {
      return res
        .status(403)
        .send("Access denied. User is not admin");
  }
  next();
}