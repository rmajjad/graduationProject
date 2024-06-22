import userModel from "../../DB/models/User.model.js";
import { AppError } from "../utils/AppError.js";

export const checkEmail = async(req,res,next)=>{
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
        return next(new AppError(`email already exists`,409));
    }

    next();
}