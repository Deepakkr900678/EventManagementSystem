const mongoose = require("mongoose");
const uuid = require("uuid");
const moment = require("moment");

const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    unique: true,
    default: function genUUID() {
      return uuid.v4();
    },
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }, token: {
    type: String,
  },
},
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.createdAt = moment(ret.createdAt).format("DD MMM YYYY");
        ret.updatedAt = moment(ret.updatedAt).format("DD MMM YYYY");
        return ret;
      },
    },
  });

module.exports = {
  UserSchema,
};
