
var jwt = require('jsonwebtoken');

module.exports = ( req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(req.header, token, req.body);
        const decoded = jwt.verify(token , process.env.JWT_KEY);
        req.userData = decoded;
        console.log(decoded.role);
        if(decoded.role === 1){
            //    is admin
            next();
        }else{
            return res.status(403).json({
                message: 'page secured'
            })
        }
    }catch (err){
        return res.status(401).json({
            message: "Auth failed"
        })
    }

};