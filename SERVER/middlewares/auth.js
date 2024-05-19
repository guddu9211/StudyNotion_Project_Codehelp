const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/User')


// auth ka middleware
exports.auth = async (req, resp, next) => {
    try{
        // extract token [ best: bearer token; worst: body se retrieve kiya hua token ]
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","");

        if(!token){
            return resp.status(401).json({
                success: false,
                message: "Token is not found ",
            });
        }

        // verify the token 
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded value ", decode);
            req.user = decode;

            next();
        } catch(err){
            // verification issue 
            return resp.status(401).json({
                success: false, 
                message: "Token is invalid "
            })
        }
    } catch(err){
        return resp.status(401).json({
            success: false, 
            message: "Something went wrong while validating the token"
        })
    }
}


// is student ? middleware
exports.isStudent = async (req, resp, next) => {
    try {
        if(req.user.accountType !== "Student"){
            return resp.status(401).json({
                success: false,
                message: "This is a protected route for students only"
            });
        }
        next();
    } catch(err) {
        return resp.status(500).json({
            success: false,
            message: "isStudent auth is failed "
        })
    }
}


// is Admin ? 
exports.isAdmin = async (req, resp, next) => {
    try {
        if(req.user.accountType !== "Admin"){
            return resp.status(401).json({
                success: false,
                message: "This is a protected route for Admin only"
            });
        }
        next();
    } catch(err) {
        return resp.status(500).json({
            success: false,
            message: "isAdmin auth is failed "
        })
    }
}


// is Instructor ?
exports.isInstructor = async (req, resp, next) => {
    try {
        if(req.user.accountType !== "Instructor"){
            return resp.status(401).json({
                success: false,
                message: "This is a protected route for Instructor only"
            });
        }
        next();
    } catch(err) {
        return resp.status(500).json({
            success: false,
            message: "isInstructor auth is failed "
        })
    }
}
