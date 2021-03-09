const mongoose = require("mongoose");
const { stringify } = require("qs");

const registerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    dob:{
        type: Date,
        required: true
    }
});

// creating table of the form of register schema
const Register = new mongoose.model("Register",registerSchema);

module.exports = Register