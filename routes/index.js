const express = require('express');
const fs = require('fs');
const router = express.Router();

const PATH_ROUTERS = __dirname;
const removeExtension = (filename) => {
    return filename.split('.').shift();
}
const a = fs.readdirSync(PATH_ROUTERS).filter(file => {
    const name = removeExtension(file);
    if(name !== 'index'){
        console.log(name);
        router.use(`/${name}`, require(`./${file}`));
    };
});

console.log({a});

module.exports = router;