const mongoose = require("mongoose")

const dataSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    subject: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Data", dataSchema)