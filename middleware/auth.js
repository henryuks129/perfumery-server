const jwt = require('jsonwebtoken');
// const token = require('../controller/userController');

function auth(req,res,next){
    try{
        // const token = req.headers.authorization.split(' ')[1]
        const token = req.cookies.token
        console.log(req.cookies);
        if(!token){
            console.log('You must login to view the order page');
            res.status(401).json({status:"false",errMessage:"unauthorized"})
        }
        const verified =jwt.verify(token,process.env.JWT_SECRET)
        req.user = verified.user
        next()
    }catch(err){
        console.log(err);
        res.status(401).json({errMessage:"unauthorized"})
    }
}

module.exports = auth