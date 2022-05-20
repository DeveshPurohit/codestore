import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
  if (req.method == "POST") {
    let user = await User.findOne({"email": req.body.email})
    
    if(user){
      const bytes  = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET);
      const originalText = bytes.toString(CryptoJS.enc.Utf8);
        if(req.body.email == user.email && req.body.password == originalText){
            var token = jwt.sign({email: user.email, name: user.name }, process.env.JWT_SECRET, {expiresIn: "1d"});
            res.status(200).json({success: true, token});
        }
        else{
            res.status(400).json({success: false, error: "Invalid Credentials"})
        }
    }
    else{
        res.status(400).json({ error: "User Not Found" });    
    }
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDb(handler);
