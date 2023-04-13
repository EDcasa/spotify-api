const mongoose = require('mongoose');
//import mongoose delete
const mongooseDelete  = require('mongoose-delete');
const TracksSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    album: {
        type: String,
    },
    cover: {
        type: String,
        validate: {
            validator: (req) => {
                return true;
            },
            message: "ERROR_URL"
        },
    },
    artist: {
        name: {
            type: String,
        },
        nickname: {
            type: String,
        },
        nationality: {
            type: String,
        }
    },
    duration: {
        start: {
            type: Number,
        },
        end: {
            type: Number,
        }
    },
    mediaId: {
        type: mongoose.Types.ObjectId
    }
},
    {
        timestamps: true,
        versionKey: false
    });
//add methos wit relation storage
TracksSchema.statics.findAllData = function () {
    const joinData = this.aggregate([
      {
          $lookup: {
              from: 'storages',
              localField: 'mediaId',
              foreignField: '_id',
              as: 'audio'
          }
      },
      {
          $unwind: "$audio"
      }
  ])
  return joinData;
  };

TracksSchema.statics.findOneData = function (id) {
  const joinData = this.aggregate([
    {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        }
    },
    {
        $lookup: {
            from: 'storages',
            localField: 'mediaId',
            foreignField: '_id',
            as: 'audio'
        }
    },
    {
        $unwind: "$audio"
    }
])
return joinData;
    // return this.find(query).populate('mediaId');
};

TracksSchema.plugin(mongooseDelete, { overrideMethods: 'all' });
module.exports = mongoose.model('tracks', TracksSchema);
