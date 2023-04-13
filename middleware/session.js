const { handleHttpError } = require('../utils/handleError');
const { verifyToken } = require('../utils/handleJwt');
const { usersModel } = require('../models');
const getProperties = require('../utils/handlePropertiesEngine');
const propertiesKey = getProperties()

const authMiddleware = async (req, res, next) => {
    
    try {
        const {authorization} = req.headers;
        if(!authorization){
            handleHttpError(res, 'NOT AUTHORIZED - TOKEN', 401);
            return;
        }
        const [type, token] = authorization.split(' ');
        if(type !== 'Bearer'){
            handleHttpError(res, 'NOT AUTHORIZED', 401);
            return;
        }
        const data = await verifyToken(token);

        if(!data){
            handleHttpError(res, 'NOT PAYLOAD DATA', 401);
            return;
        }
        const query = {
            [propertiesKey.id]: data[propertiesKey.id]
        }
        const user = await usersModel.findOne(query);
        req.user = user; 
        next();
    } catch (error) {
        handleHttpError(res, 'ERROR IN AUTH MIDDLEWARE');
    }
}


module.exports = {authMiddleware};