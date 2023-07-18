const UserModel = require('../model/userModel');
// const mongoose =express('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register_controller = async (req,res)=>{
    const {email,firstname,lastname,password,passwordVerify} = req.body;
    try{
        // VALIDATION
        if(!email || !firstname || !lastname || !password || !passwordVerify){
            res.status(400).json(
                {status:"false",errMsg:"please enter required fields"}
            )
            return
        }
        if(password.length < 6){
            res.status(400).json({status:"false",errMsg:"password length must be at least 6 characters"})
            return
        }
        if(password !== passwordVerify){
            return res.status(400).json({status:"false",errMsg:"Enter the same pasword"})
        }
        const existingUser = await UserModel.findOne({email});
        if(existingUser){
            return res.status(400).json({status:"false",errMsg:"AN account already exists with this email"})
        }

        // Harsing pasowrd
        const salt = await bcrypt.genSalt();
        const passwordHarsh = await bcrypt.hash(password,salt)

        console.log(passwordHarsh);

        const newUser = new UserModel({
            email,firstname,lastname,password:passwordHarsh
        })
        const savedUser = await newUser.save();
        // res.status(201).json(savedUser);

        // Token
        const token = jwt.sign({
            user:savedUser._id
        }, process.env.JWT_SECRET);
        console.log(token);
        console.log('Registered Successfully');

        // Saving token in cookie
        // res.cookie('token',token,{
        //     httpOnly:true
        // }).send()
        res.json({token})

    } catch(error){
        console.log(error);
        res.status(500).send();
    }
}

// Login controller 
const login_controller = async (req,res)=>{
    const {email,password} = req.body;
    try{
        // VALIDATION
        if(!email || !password){
            res.status(400).json(
                {status:"false",errMsg:"please enter required fields"}
            )
            return
        }

        // finding registered email and validating email
        const existingUser = await UserModel.findOne({email});
        if(!existingUser){
            return res.status(400).json({status:"false",errMsg:"Wrong credentials"})
        }

        // Comparing password and validating password
        const passwordCorrect = await bcrypt.compare(password,existingUser.password);
        if(!passwordCorrect){
            return res.status(400).json({status:"false",errMsg:"Wrong crednetials"})
        }

        // Token
        const token = jwt.sign({
            user:existingUser._id
        }, process.env.JWT_SECRET);
        // console.log(token);
        console.log('Registered Successfully');

        // Confirming token in cookie
        // res.cookie('token',token,{
        //     httpOnly:true
        // }).send()
        res.status(200).json({token})

    } catch(error){
        console.log(error);
        res.status(500).send();
    }
}

const logout_controller = async (req,res)=>{
    // res.cookie('token',"",{
    //     httpOnly:true,
    //     expires:new Date(0)
    // }).send()
    res.json({token:''})
    console.log("Logged out");
}

// loogedIn
const loggedIn_conntroller = (req,res)=>{
    try{
        // console.log(req.cookies);
        // const token = req.cookies.token
        const token = req.headers.authorization
        console.log(token);
            if(!token){
                return res.json(false)
            }
            jwt.verify(token,process.env.JWT_SECRET)
            res.json(true)
    }catch(err){
        console.log(err);
        res.json(false)
    }
}

module.exports = {
    register_controller,
    login_controller,
    logout_controller,
    loggedIn_conntroller
}