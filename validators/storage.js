const { check } = require('express-validator');
const validatorsResults = require('../utils/handleValidator');

const validatorGetItem = [
    check('id')
    .exists().withMessage('Id not exist')
    .notEmpty().withMessage('Id is empty')
    .isMongoId().withMessage('MongoId is not valid'),
    (req, res, next) => {
         return validatorsResults(req, res, next);
     }
]

module.exports = {validatorGetItem};
