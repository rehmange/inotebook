const jwt = require('jsonwebtoken');

const jwt_SECRET = "abdul@123";

const fetchuser = (req,res,next)=>{
    //Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please autheenticaate using a valid token"})
    }
    try {
        const data = jwt.verify(token,jwt_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"Please autheenticaate using a valid token"})
    }
}

module.exports = fetchuser;