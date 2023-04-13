const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    //cb: callback
    destination: function (req, file, cb) {
        const pathStorage = `${__dirname}/../uploads/`;
        cb(null, pathStorage);
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.').pop();
        const filename = `file-${Date.now()}.${ext}`;
        cb(null, filename);
    }
});

const uploadMiddleware = multer({ storage });

module.exports = uploadMiddleware;