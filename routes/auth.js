const express = require('express');
const router = express.Router();
const {validatorRegister, validatorLogin } = require('../validators/auth');
const { RegisterCtrl, LoginCtrl } = require('../controllers/auth');
router.post('/register', validatorRegister,RegisterCtrl);
router.post('/login', validatorLogin, LoginCtrl);

module.exports = router;