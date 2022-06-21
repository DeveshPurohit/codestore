import Forgot from "../../models/Forgot"
import User from "../../models/User"

export default function handler(req, res) {
    if(req.body.sendMail){
        let forgot = Forgot({
            email: req.body.email,
            token: token
        })
        let token = 'sfdsfdsfdsfdfsdfdsfdsf'
        let email = `We have sent you this email in response to your request to reset your password on CodeStore.com. After you reset your password, any credit card information stored in My Account will be deleted as a security measure.
    
        <br/><br/>
        
        To reset your password, please follow the link below:
        
        <a href="https://CodeStore.com/forgot?token=${token}">Click here to reset your password</a>
        
        <br/><br/>
        
        We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can change it by going to your CodeStore My Account Page and clicking on the "Change Email Address or Password" link.
        
        <br/><br/>
     `
    }
    else{

    }
    
    res.status(200).json({ success: true })
  }
  