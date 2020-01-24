const express = require('express');
const {check, validateResult} = require("express-validator/check");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');
const personnel = require('./models/personnel');

const app = express();
app.use(bodyParser.json());

// Sign In Routes
// I used express-validator to validate users input
app.post('/signIn',[
    check("username","Please Enter Valid Username")
    .not()
    .notEmpty(),check("password","Please Enter Valid Password").isLength({
        min:6
    })
],
(req,res)=>{
    const errors = validateResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        })
    }
    // Pull user data from database to check if he exist
    const {email, password} = req.body;
    try{
        // create a file called User.js to connect to the database
        // import it to app.js
        const user = User.findOne({
                email
        })
        if(!user){
            return res.status(400).json({
                message:"User Doesn't Exist"
            })
        }
         const isMatch = bcrypt.compare(password, user.password);
         if(!isMatch){
             return res.status(400).json({
                 message:"Incorrect Password !!"
             });

             const payload = {
                 user:{
                     id:user.id
                 }
             };

             jwt.sign(
                 payload,
                 "secret",
                 {
                     expiresIn:3600
                 },
                 (err,token)=>{
                     if(err){
                         throw err
                     }
                     res.status(200).json({
                         token
                     })
                 }
             )
         }
        res.status(200).json({
            email:email,
            Pass:password
    })
}catch(err){
    console.log(err);
    res.status(500).json({
        err:err.message
    })
    
}
})

app.listen(process.env.PORT || 3000,()=>{
    console.log('server running on port 3000');
});
