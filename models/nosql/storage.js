const mongoose = require('mongoose');
const mongooseDelete  = require('mongoose-delete');

const StorageSchema = new mongoose.Schema({
    url: {
        type: String,
    },
    filename:{
        type: String,
    },
},
{
    timestamps: true,
    versionKey:false
});
StorageSchema.statics.findAllData = function () {
    const joinData = this.aggregate([])
    return joinData;
  };
  
StorageSchema.plugin(mongooseDelete, { overrideMethods: 'all' });
module.exports = mongoose.model('storages', StorageSchema);
