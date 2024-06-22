import cartModel from "../../../DB/models/Cart.model.js";
import orderModel from "../../../DB/models/Order.model.js";
import productModel from "../../../DB/models/Product.model.js";
import userModel from "../../../DB/models/User.model.js";
import { AppError } from "../../utils/AppError.js";


export const create = async(req, res, next) => {

    const cart =  await cartModel.findOne({userId:req.user._id});
    if(!cart || cart.products.length === 0) {
        //return res.status(400).json({message:"cart is empty"});
        return next(new AppError(`cart is empty`,400));
    }
    req.body.products = cart.products;

    let finalProductList = [];
    let subTotal = 0;
    for(let product of req.body.products){

        const checkProduct = await productModel.findOne({
            _id:product.productId,
            stock:{$gte:product.quantity},
        }); 
        
        if(!checkProduct){
            return next(new AppError(`product quantity not available`,400));
        }
        product = product.toObject();
        
        product.discount = checkProduct.discount;
        product.price = checkProduct.price;
        product.finalPrice = product.quantity * checkProduct.finalPrice;
        product.productName = checkProduct.name;
        product.mainImage = checkProduct.mainImage;
        subTotal += product.finalPrice;
        finalProductList.push(product);
        

    }
    

    
    const user = await userModel.findById(req.user._id);
    if(!req.body.address){
        req.body.address = user.address;
    }
    if(!req.body.phone){
        req.body.phone = user.phone;
    }
    


    
    
    const order = await orderModel.create({
        userId: req.user._id,
        products: finalProductList,
        finalPrice: subTotal, 
        address: req.body.address,
        phoneNumber : req.body.phone,
        updatedBy:req.user._id,

        
    });
        


    if(order){

        for(const product of req.body.products){
            await productModel.findOneAndUpdate({_id:product.productId},
                {
                    $inc:{
                        stock:-product.quantity,
                    }
                }
            )
        }
        

        await cartModel.findOneAndUpdate({userId:req.user._id},{
            products : []
        })
    }

    await order.save();
    return res.json({message:"success",order});
    
}; 



export const getOrders = async(req, res) => {
    const orders = await orderModel.find({});

    return res.json({message:"success",orders});
};

export const getUserOrders = async(req, res, next) => {
    const orders = await orderModel.find({userId:req.user._id}); 
    return res.json({message:"success",orders});
};

export const changeStatus = async(req, res, next) => {
    const {orderId} = req.params;
    const {status} =  req.body;
    const order = await orderModel.findById(orderId);
    
    if(!order){
        return next(new AppError(`order not found`,400));
    }
    order.status = status;
    await order.save();
    return res.status(201).json({message:"success",order})
}