const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Ball = new Schema(
    {
        colour: { type: String, required: true },
        xcoord: { type: Number, required: true },
        ycoord: { type: Number, required: true },
        dist: { type: Number, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('balls', Ball)