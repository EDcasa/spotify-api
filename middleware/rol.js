const { handleHttpError } = require('../utils/handleError');

const checkRol = (rol) => (req, res, next) => {
    try
    {
        const {user}  = req;
        const rolesByUser = user.role;
        const checkValueRol = rol.some((rolSingle)=> rolesByUser.includes(rolSingle));
        if(!checkValueRol){
            handleHttpError(res, "ERROR_PERMISSIONS_USER", 403);
            return;
        }
        next();
    }
    catch(err){
        handleHttpError(res, "ERROR_PERMISSIONS", 403);
    } 
}

module.exports = checkRol;