const express = require('express');
const router = express.Router();
const uploadMiddleware = require('../utils/handleStorage');
const { createItems, getItems, getItem, updateItems, deleteItems } = require('../controllers/storage');
const { validatorGetItem } = require('../validators/storage');

router.get('/',getItems);
router.get('/:id',validatorGetItem,getItem);
router.post('/', uploadMiddleware.single('file'),createItems);
// router.put('/:id', updateItems);
router.delete('/:id',validatorGetItem, deleteItems);
module.exports = router;