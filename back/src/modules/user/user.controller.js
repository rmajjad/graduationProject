import userModel from "../../../DB/models/User.model.js"




export const getAll = async (req, res) =>{
    const users = await userModel.find({});
    return res.status(200).json({message:"success",users});
}


export const getDetails = async(req, res) => {
    const user = await userModel.findById(req.params.id);
    if(!user){
        return res.status(404).json({message:"user not found"}); 
    }
    
    return res.status(200).json({message:"success",user}); 

} 

export const update = async(req, res) => {
    const user = await userModel.findById(req.params.id);

    if(!user){
        return res.status(404).json({message:"user not found"}); 
    }
    user.userName = req.body.userName;
    user.email = req.body.email;
    if(await userModel.findOne({email:user.email,_id:{$ne:req.params.id}})){
        return res.status(409).json({message:"user already exists"});
    }
    

    
    user.confirmEmail = req.body.confirmEmail;
    user.status = req.body.status;
    user.role = req.body.role;
    
    await user.save();
    
    return res.json({message:"success", user});
};


export const destroy = async(req,res)=> {
    const user = await userModel.findByIdAndDelete(req.params.id);
    if(!user){
        return res.status(404).json({message:"user not found"});
    }

    
    return res.status(200).json({message:"success",user});
};

