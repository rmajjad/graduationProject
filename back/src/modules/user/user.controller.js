import userModel from "../../../DB/models/User.model.js"
import { AppError } from "../../utils/AppError.js";




export const getAll = async (req, res) =>{
    const users = await userModel.find({});
    return res.status(200).json({message:"success",users});
}


export const getDetails = async(req, res, next) => {
    const user = await userModel.findById(req.user._id);
    if(!user){
        return next(new AppError(`user not found`,400));
    }
    
    return res.status(200).json({message:"success",user}); 

} 

export const update = async(req, res, next) => {
    const user = await userModel.findById(req.params.id);

    if(!user){
        return next(new AppError(`user not found`,400));
    }
    user.userName = req.body.userName;
    user.email = req.body.email;
    if(await userModel.findOne({email:user.email,_id:{$ne:req.params.id}})){
        return next(new AppError(`user already exists`,409));
    }
    

    
    user.confirmEmail = req.body.confirmEmail;
    user.status = req.body.status;
    user.role = req.body.role;
    
    await user.save();
    
    return res.json({message:"success", user});
};


export const destroy = async(req,res,next)=> {
    const user = await userModel.findByIdAndDelete(req.params.id);
    if(!user){
        return next(new AppError(`user not found`,404));
    }

    
    return res.status(200).json({message:"success",user});
};

