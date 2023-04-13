const mongoose = require('mongoose');
const mongooseDelete  = require('mongoose-delete');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    age:{
        type: Number,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        select: false,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
},
{
    timestamps: true,
    versionKey:false
});
UserSchema.plugin(mongooseDelete, { overrideMethods: 'all' });
module.exports = mongoose.model('users', UserSchema);
