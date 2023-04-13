//import jsonwebtoken
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const getProperties = require('../utils/handlePropertiesEngine');
const propertiesKey = getProperties()
const tokenSign = async(user)=>{
    const sign = jwt.sign(
        {
            [propertiesKey.id]:user[propertiesKey.id],
            role: user.role
        }, 
        JWT_SECRET, 
        {
            expiresIn: '1h'
        }
        );
        return sign;

}

const verifyToken = async(token)=>{
    try{
        return jwt.verify(token, JWT_SECRET);
    }catch(err){
        return false;
    }
}

module.exports = {tokenSign, verifyToken}