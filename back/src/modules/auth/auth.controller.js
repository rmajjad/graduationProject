import userModel from "../../../DB/models/User.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { customAlphabet } from "nanoid";
import { sendEmail, sendUserCode } from "../../utils/email.js";
import { AppError } from "../../utils/AppError.js";

export const registor = async (req, res) => {
    const { userName, email, password } = req.body;
    

    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALTROUND));
    const createUser = await userModel.create({ userName, email, password: hashedPassword });
    const token =  jwt.sign({email},process.env.CONFIRM_EMAIL_SIG);

    await sendEmail(email, 'Welcome',userName, token);

    return res.status(201).json({ message: "success", user: createUser });
}

export const confirmEmail = async (req, res) => {
    const token = req.params.token;
    const decoded = jwt.verify(token,process.env.CONFIRM_EMAIL_SIG);
    await userModel.findOneAndUpdate({ email: decoded.email},{confirmEmail:true});
    return res.status(200).json({ message: "success"});
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        return next(new AppError(`invaled data`,400));
    }
    if(!user.confirmEmail){
        return next(new AppError(`please confirm your email`,400));
    }
    const match = await bcrypt.compare(password, user.password);
    if (user.status == "NotActive") {
        return next(new AppError(`user account is blocked`,400));
    }
    if (!match) {
        return next(new AppError(`invaled data`,400));
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.LOGINSIG);
    return res.status(200).json({ message: "success", token,role:user.role }); 
}


export const sendCode = async (req, res, next) => {

    const { email } = req.body;

    const code = customAlphabet('1234567890abcdef', 4)();
    const user = await userModel.findOneAndUpdate({ email }, { sendCode: code }, { new: true });
    if (!user) {
        return next(new AppError(`email not found`,400));
    }
    await sendUserCode(email, 'Reset Password', code);

    return res.status(200).json({ message: 'success' });

}

export const forgotPassword = async(req, res, next) =>{
    const {email, password, code} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
        return next(new AppError(`email not found`,400));
    }
    if(user.sendCode != code){
        return next(new AppError(`Invalid code`,404));
    }
    user.password = await bcrypt.hash(password,parseInt(process.env.SALTROUND));
    user.sendCode = null;
    await user.save();
    return res.status(200).json({message:"success"}); 
}