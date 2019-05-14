
var jwt = require('jsonwebtoken');

module.exports = ( req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(req.header, token);
        const decoded = jwt.verify(token /*process.env.JWT_KEY*/, "secret");
        req.userData = decoded;
        next();
    }catch (err){
        return res.status(401).json({
            message: "Auth failed"
        })
    }

};