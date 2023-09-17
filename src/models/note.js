const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,  //string is a datatype
        required: true,   ///if not provided then it will throw error
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model("Note", noteSchema);