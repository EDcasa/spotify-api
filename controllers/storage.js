const fs = require('fs');
const { matchedData } = require('express-validator');
const { storageModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');
const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`
const getItems = async (req, res) => {
    try {
        const data = await storageModel.find({});
        res.send({data})
    } catch (error) {
        handleHttpError(res, 'ERROR IN GET ITEMS');
    }
};

const getItem = async (req, res) => {
    try {
        const {id} = matchedData(req)
        const data = await storageModel.findById(id);
        res.send({data})
    } catch (error) {
        handleHttpError(res, 'ERROR IN GET ITEM');
    }
};

const createItems = async (req, res) => {
    try {
        const {body, file} = req;
        const fileData ={
            filename: file.filename,
            url:`${PUBLIC_URL}/${file.filename}`
        }
        const data = await storageModel.create(fileData);
        res.send({data})
    }
    catch (error) {
        handleHttpError(res, 'ERROR IN CREATE ITEM');
    }
};

const deleteItems = async (req, res) => {
    try{
        const {id} = matchedData(req);
        const data = await storageModel.findById(id);
        await storageModel.deleteOne(id)
        const {filename} = data;
        const filePath = `${MEDIA_PATH}/${filename}`;
        fs.unlink(filePath);
        const dataResponse = {
            filePath,
            deleted:1
        }
        res.send({data});
    } catch (error) {
        handleHttpError(res, 'ERROR IN DELETE ITEM');
    }
};


module.exports = { 
    getItems,
    getItem,
    createItems,
    deleteItems
};