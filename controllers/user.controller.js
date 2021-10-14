const express = require("express");
const nodemailer = require('nodemailer');
require("dotenv").config();


const {CURRENT_ENVIRONMENT,SMTP_USERNAME,SMTP_PASSWORD} = process.env
console.log(CURRENT_ENVIRONMENT,SMTP_USERNAME,SMTP_PASSWORD)
const router = express.Router();


const User = require("../models/user.model");

//

router.post("",async(req,res)=>{
  let {email,first_name,last_name} = req.body;
  var message = {
    from: "dchaurasiya8589@gmail.com",
    to: email,
    subject: `Welcome to ABC system ${first_name} ${last_name}`,
    text: `Hi ${first_name}, Please confirm your email address`,
    html: "<h1>This is a Welcome message</h1>"
  };
  
 
const transporter =  nodemailer.createTransport({
    host: CURRENT_ENVIRONMENT === "development"?"smtp.mailtrap.io":"",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user:SMTP_USERNAME,
      pass:SMTP_PASSWORD,
    },
});

transporter.sendMail(message)
console.log("message sent")
})
//
router.get("",async(req,res)=>{

    const page = +req.query.page || 1;

   const size =  +req.query.size || 3;

    const offset = (page - 1) * size;

    const user = await User.find().skip(offset).limit(size).lean().exec();

    const totalUserCount = await User.find().countDocuments();
    
    const totalPages = Math.ceil(totalUserCount/size);
    
    var message = {
        from: "dchaurasiya8589@gmail.com",
        to: "laughclub1k@gmail.com",
        subject: "Message title",
        text: "Plaintext version of the message",
        html: "<h1>HTMLModified message</h1>"
      };
      
     
    const transporter =  nodemailer.createTransport({
        host: CURRENT_ENVIRONMENT === "development"?"smtp.mailtrap.io":"",
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user:SMTP_USERNAME,
          pass:SMTP_PASSWORD,
        },
    });

    transporter.sendMail(message)
      
    return res.send({user,totalPages});
})

module.exports = router;