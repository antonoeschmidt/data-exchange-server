const mongoose = require("mongoose")

const DataSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    dataType: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Data", DataSchema)