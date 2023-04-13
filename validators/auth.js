const { check } = require('express-validator');
const validatorsResults = require('../utils/handleValidator');

const validatorRegister = [
    check('name')
    .exists().withMessage('Id not exist')
    .notEmpty().withMessage('Id is empty')
    .isLength({ min: 3, max: 99 }).withMessage('Id must be between 3 and 99 characters'),
    check('age')
    .exists().withMessage('Id not exist')
    .notEmpty().withMessage('Id is empty')
    .isNumeric().withMessage('Id must be numeric'),
    check('password')
    .exists().withMessage('Id not exist')
    .notEmpty().withMessage('Id is empty')
    .isLength({ min: 3, max: 15 }).withMessage('Id must be between 3 and 15 characters'),
    check('email')
    .exists().withMessage('Id not exist')
    .notEmpty().withMessage('Id is empty')
    .isEmail(),
    (req, res, next) => {
         return validatorsResults(req, res, next);
     }
]

const validatorLogin = [
    check('password')
    .exists().withMessage('Id not exist')
    .notEmpty().withMessage('Id is empty')
    .isLength({ min: 3, max: 15 }).withMessage('Id must be between 3 and 15 characters'),
    check('email')
    .exists().withMessage('Id not exist')
    .notEmpty().withMessage('Id is empty')
    .isEmail(),
    (req, res, next) => {
         return validatorsResults(req, res, next);
     }
]

module.exports = { validatorRegister, validatorLogin };
