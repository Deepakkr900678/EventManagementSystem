const mongoose = require("mongoose");
const uuid = require("uuid");
const moment = require("moment");

const EventSchema = new mongoose.Schema({
    _id: {
        type: String,
        unique: true,
        default: function genUUID() {
            return uuid.v4();
        },
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    organizer: {
        type: String,
        required: true,
    },
    ticketPrice: {
        type: Number, 
        required: true,
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
    EventSchema
};

