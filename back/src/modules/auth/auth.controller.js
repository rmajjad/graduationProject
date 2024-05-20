import userModel from "../../../DB/models/User.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { customAlphabet } from "nanoid";
import { sendEmail } from "../../utils/email.js";

export const registor = async (req, res) => {
    const { userName, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
        return res.status(409).json({ message: "email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALTROUND));
    const createUser = await userModel.create({ userName, email, password: hashedPassword });
    await sendEmail(email, 'Welcome', `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Our Pharmacy</title>
    <style>
        body { font-family: 'Helvetica', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #d0d0d0; border-radius: 5px; }
        .header-row { display: flex; align-items: center; margin-bottom: 20px; }
        .header-image { flex: 0 0 100px; } /* Adjust size as needed */
        .header-text { flex: 1; font-size: 22px; color: #0275d8; padding-left: 20px; }
        .content { margin-top: 20px; }
        .footer { margin-top: 20px; font-size: 14px; text-align: center; color: #888; }
        a { color: #0275d8; }
        .button { background-color: #1283df; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px; }
    </style>
    </head>
    <body>
    <div class="container">
        <div class="header-row">
            <div class="header-text">Welcome to Our Pharmacy!</div>
        </div>
        <div class="content">
            <p>Hi ${userName},</p>
            <p>Thank you for registering at Our Pharmacy. We're thrilled to have you with us!</p>
            <p>As a registered member, you can now manage prescriptions, order refills, and access exclusive health tips and offers.</p>
            <p>Start exploring our services by clicking the button below:</p>
            <p><a href="[Link to Pharmacy]" class="button">Visit Our Pharmacy</a></p>
            <p>If you have any questions, feel free to contact us at <a href = 'mailto:${process.env.SENDEREMAIL}' style="text-decoration: none;"><b>Our Email</b></a>.</p>
            <p>Welcome aboard,</p>
            <p>Your friends at Our Pharmacy</p>
        </div>
        <div class="footer">
            <p>You received this email because you registered on our website. If you believe this was a mistake, please ignore this email or contact us.</p>
        </div>
    </div>
    </body>
    </html>
    
`);

    return res.status(201).json({ message: "success", user: createUser });
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "invaled data" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (user.status == "NotActive") {
        return res.status(400).json({ message: "user account us blocked" });
    }
    if (!match) {
        return res.status(400).json({ message: "invaled data" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.LOGINSIG);
    return res.status(200).json({ message: "success", token,role:user.role }); 
}


export const sendCode = async (req, res) => {

    const { email } = req.body;

    const code = customAlphabet('1234567890abcdef', 4)();
    const user = await userModel.findOneAndUpdate({ email }, { sendCode: code }, { new: true });
    if (!user) {
        return res.status(404).json({ message: "email not found" });
    }
    await sendEmail(email, 'Reset Password', `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Reset Your Password</title>
<style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ccc; border-radius: 5px; }
    .header { font-size: 24px; color: #444; margin-bottom: 20px; }
    .content { margin-top: 20px; }
    .code { background-color: #1283df; color: white; padding: 10px; font-size: 20px; font-weight: bold; text-align: center; border-radius: 5px; }
    .footer { margin-top: 20px; font-size: 12px; text-align: center; color: #aaa; }
</style>
</head>
<body>
<div class="container">
    <div class="header">Password Reset Request</div>
    <div class="content">
        <p>Hi,</p>
        <p>You recently requested to reset your password for your account. Please use the following code to complete the process:</p>
        <div class="code">${code}</div>
        <p>If you did not request a password reset, please ignore this email or contact us if you have any concerns.</p>
    </div>
    <div class="footer">
        <p>This is an automated message, please do not reply.</p>
    </div>
</div>
</body>
</html>
`);

    return res.status(200).json({ message: 'success' });

}

export const forgotPassword = async(req, res) =>{
    const {email, password, code} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(404).json({ message:"email not found"});
    }
    if(user.sendCode != code){
        return res.status(404).json({ message: "Invalid code"});
    }
    user.password = await bcrypt.hash(password,parseInt(process.env.SALTROUND));
    user.sendCode = null;
    await user.save();
    return res.status(200).json({message:"success"}); 
}