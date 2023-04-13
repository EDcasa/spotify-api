const { matchedData } = require('express-validator');
const { encrypt, compare } = require('../utils/handlePassword');
const { usersModel } = require('../models');
const { tokenSign } = require('../utils/handleJwt');
const { handleHttpError } = require('../utils/handleError');
const ENGINE_DB = process.env.ENGINE_DB;


const RegisterCtrl = async(req, res) => {
    {
        try {
            req = matchedData(req)
            const password = await encrypt(req.password)
            const body = {...req, password} 
            const dataUser = await usersModel.create(body);
            dataUser.set('password', undefined,{strict: false});
        
            const data = {
                token: await tokenSign(dataUser),
                user: dataUser
            }

            res.send({data});   
        } catch (error) {
            handleHttpError(res, 'ERROR IN REGISTER');
        }
    }
}

const LoginCtrl = async(req, res) => {
    try {
        const {email, password} = matchedData(req);
        let user;
        if(ENGINE_DB  === 'nosql'){ 
             user = await usersModel.findOne({email}).select('password');
        }else{
            user = await usersModel.findOne({email})
        }
        
        if(!user){
            handleHttpError(res, 'USER NOT FOUND');
            return;
        }
        const check = await compare(password, user.password);
        if(!check){
            handleHttpError(res, 'PASSWORD INCORRECT',401);
            return;
        }

        user.set('password', undefined,{strict: false})
        const data = {
            token: await tokenSign(user),
            user
        }

        res.send({data});

    } catch (error) {
        handleHttpError(res, 'ERROR IN LOGIN');
    }
}

module.exports = {RegisterCtrl, LoginCtrl};