const mongoose = require("mongoose")

const PublicKeySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("Key", PublicKeySchema)