const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,  //string is a datatype
        required: true,   ///if not provided then it will throw error
    },
    email: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model("User", userSchema);