const express = require('express');
const router = express.Router();
const { validatorCreateItem, validatorGetItem } = require('../validators/tracks');
const { getItems, getItem, createItems, updateItems, deleteItems } = require('../controllers/tracks');
//import middleware
const customHeader = require('../middleware/customHeader');
const {authMiddleware} = require('../middleware/session');
const checkRol = require('../middleware/rol');
router.get('/',
authMiddleware,
checkRol(['admin']), 
getItems);
router.get('/:id', validatorGetItem, getItem);
router.post('/', validatorCreateItem, createItems);
router.put('/:id', validatorCreateItem, validatorGetItem, updateItems);
router.delete('/:id', validatorGetItem, deleteItems);
module.exports = router;