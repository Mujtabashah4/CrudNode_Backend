const userModel = require("../models/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
//import 'dotenv/config';
const SECRET_KEY = process.env.SECRET_KEY;


const signup = async (req, res) => {
    //Existing User
    const { username, email, password } = req.body;
    try {
        //Existing User Check
        const existingUser = await userModel.findOne({ email: email })
        if (existingUser) {
            return res.status(400).json("Email already exists")
        }
        //Hashing Password
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await userModel.create({
            username: username,
            email: email,
            password: hashedPassword,
        });
        //Get All Users
        // const usersList = await userModel.findAll();
        // if (usersList) {
        //     return res.status(200).json(usersList);
        // }
        // else {
        //     // Handle the case where no users are found
        //     return res.status(404).json({ message: "No users found." });
        // }
        //Token Generation

        const token = jwt.sign({
            email: result.email,
            id: result._id
        }, SECRET_KEY)
        //process.env.SECRET_KEY
        res.status(201).json({
            user: result,
            token: token
        })



    }

    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong Try Again!" })
    }


}


const signin = async (req, res) => {

    const { email, password } = req.body
    try {
        const existingUser = await userModel.findOne({ email: email })
        if (!existingUser) {
            return res.status(404).json("User not found!")
        }

        //Check Password Matching
        const matchPassword = await bcrypt.compare(password, existingUser.password)
        if (!matchPassword) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY)
        res.status(200).json({
            user: existingUser,
            token: token
        })


    }
    catch (error) {
        console.log(error);
    }


}

module.exports = { signin, signup };