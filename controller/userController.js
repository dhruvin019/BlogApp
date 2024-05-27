const userModel = require('../models/userModel')
const bcrypt = require("bcrypt");
//register
exports.registerController = async (req,res) => {
    try{
        const {username,email,password} = req.body;
        // validation
        if(!username || !email || !password){
            return res.status(400).send({
                success: false,
                message : "please fill all fields"  
            })
        } 
        // existing user
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(400).send({
                success: false,
                message : "user already exist" 
            })
        }

        // hashpassword using bcrypt
        const hashpassword = await bcrypt.hash(password,10);
        password:hashpassword;

        // save user
        const user = new userModel({username,email,password:hashpassword});
        await user.save();
        return res.status(201).send({
            success: true,
            message : "user register succesfull",
            user
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).send({
            success: false,
            message : "Error to register",
            error
        })
    }    
};

// get all user 
exports.getAllUser = async (req,res) => {
    try{
        const allUser = await userModel.find({});
        return res.status(200).send({
            count : allUser.length,
            success: true,
            message : "all user data",
            allUser
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).send({
            success: false,
            message : "Error in get all user",
            error
        }) 
    }
    
};

// login 
exports.loginController = async (req,res) => {
    try{
        const {email,password} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(200).send({
                success: false,
                message : "email not registeredr"
            })  
        }
        // validate password
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).send({
                success: false,
                message : "password not match"
            })  
        }
        return res.status(200).send({
            success: true,
            message : "login successfully",
            user
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).send({
            success: false,
            message : "Error in login",
            error
        }) 
    }
    
};