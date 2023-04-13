const { check } = require('express-validator');
const validatorsResults = require('../utils/handleValidator');
const validatorCreateItem = [
    check('name').exists().notEmpty(),
    check('album').exists().notEmpty(),
    check('cover').exists().notEmpty(),
    // check('artist').exists().notEmpty(),
    check('artist_name').exists().notEmpty(),
    check('artist_nickname').exists().notEmpty(),
    check('artist_nationality').exists().notEmpty(),
    // check('duration').exists().notEmpty(),
    check('duration_start').exists().notEmpty(),
    check('duration_end').exists().notEmpty(),
    check('mediaId')
    .exists().withMessage('MediaId not exist')
    .notEmpty().withMessage('MediaId is empty'),
    // .isMongoId().withMessage('MongoId is not valid'),
    (req, res, next) => {
       return validatorsResults(req, res, next);
    }

]

const validatorGetItem = [
    check('id')
    .exists().withMessage('Id not exist')
    .notEmpty().withMessage('Id is empty'),
    // .isMongoId().withMessage('MongoId is not valid'),
    (req, res, next) => {
         return validatorsResults(req, res, next);
     }
]

module.exports = {validatorCreateItem,validatorGetItem};
