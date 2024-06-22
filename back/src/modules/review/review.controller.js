import { response } from "express";
import orderModel from "../../../DB/models/Order.model.js";
import reviewsModel from "../../../DB/models/Review.model.js";
import { AppError } from "../../utils/AppError.js";



export const create = async(req,res,next)=>{
    const {productId} = req.params;
    const {comment, rating} = req.body;

    const order = await orderModel.findOne({
        userId:req.user._id,
        status:'delivered',
        "products.productId":productId,
    });

    if(!order){
        return next(new AppError(`can't review this order`,400));
    }   

    const checkReview = await reviewsModel.findOne({
        userId:req.user._id,
        productId:productId,
    });
    if(checkReview){
        return next(new AppError(`already reviewed this order`,409));
    }
    

    const review = await reviewsModel.create({
        comment,
        rating,
        productId,
        userId:req.user._id,
    });

    
    return res.status(201).json({message:"success",review}); 
}