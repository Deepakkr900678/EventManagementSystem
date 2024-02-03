const mongoose = require("mongoose");
const uuid = require("uuid");
const moment = require("moment");

const RatingSchema = new mongoose.Schema({
    _id: {
        type: String,
        unique: true,
        default: function genUUID() {
            return uuid.v4();
        },
    },
    rating: {
        type: String,
        required: true,
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Events',
    },

}, {
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
    RatingSchema
};

