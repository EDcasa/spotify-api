const { matchedData } = require('express-validator');
const { tracksModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');
const getItems = async (req, res) => {
    try {
        const data = await tracksModel.find({});
        res.send({data})   
    } catch (error) {
        handleHttpError(res, 'ERROR IN GET ITEMS');
    }
};

const getItem = async (req, res) => {
    try {
        req = matchedData(req);
        const data = await tracksModel.findOneData(req.id);
        res.send({data});        
    } catch (error) {
        handleHttpError(res, 'ERROR IN GET ITEM');
    }

};
const createItems = async (req, res) => {
    try {
        const body = matchedData(req)
        const data = await tracksModel.create(body);
        res.send({data})   
    } catch (error) {
        handleHttpError(res, 'ERROR IN CREATE ITEM');
    }
};
const updateItems = async (req, res) => {
    try {
        const {id, ...body} = matchedData(req)
        const data = await tracksModel.findOneAndUpdate(id, body);
        res.send({data})   
    } catch (error) {
        handleHttpError(res, 'ERROR IN UPDATE ITEM');
    }  
};
const deleteItems = async (req, res) => {
    try {
        const {id} = matchedData(req)
        //safe delete, delet logic with boolean. Library mongoose-delete
        const data = await tracksModel.delete({_id:id});
        res.send({data})   
    } catch (error) {
        handleHttpError(res, 'ERROR IN DELETE ITEM');
    }
    
};


module.exports = { 
    getItems,
    getItem,
    createItems,
    updateItems,
    deleteItems
};