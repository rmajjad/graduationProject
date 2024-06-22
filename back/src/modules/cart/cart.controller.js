import cartModel from "../../../DB/models/Cart.model.js";
import productModel from "../../../DB/models/Product.model.js";
import { AppError } from "../../utils/AppError.js";


export const get = async (req, res, next) => {
    const cart = await cartModel.findOne({ userId: req.user._id });
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
        
        product.name = checkProduct.name;
        product.discount = checkProduct.discount;
        product.unitPrice = checkProduct.price;
        product.mainImage = checkProduct.mainImage;
        product.finalPrice = product.quantity * checkProduct.finalPrice;
        subTotal += product.finalPrice
        finalProductList.push(product);
        

    }
    return res.json({ message: "success", products: finalProductList,subTotal });
};

export const create = async (req, res, next) => {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    
    if(!product){
        return next(new AppError(`Product not found`,404));
    }
    const cart = await cartModel.findOne({ userId: req.user._id });
    if (!cart) {
        const newCart = await cartModel.create({
            userId: req.user._id,
            products: { productId },
        });
        return res.json({ message: "success", cart: newCart });
    }
    for (let i = 0; i < cart.products.length; i++) {
        if (cart.products[i].productId == productId) {
            return next(new AppError(`product already exists`,400));
        }
    }
    cart.products.push({ productId });
    await cart.save();
    return res.json({ message: "success", cart });

};


export const updateQuantity = async (req, res) => {
    const { quantity, op } = req.body;
    const inc = (op == "+") ? quantity : -quantity;

    const cart = await cartModel.findOneAndUpdate({
        userId: req.user._id,
        "products.productId": req.params.productId
    }, {
        $inc: {
            "products.$.quantity": inc
        }
    }, {
        new: true,
    }
    );
    const updatedProduct = cart.products.find(product => product.productId.toString() === req.params.productId);
    if (updatedProduct && updatedProduct.quantity <= 0) {
        await cartModel.findOneAndUpdate(
            { userId: req.user._id },
            { $pull: { products: { productId: req.params.productId } } },
            { new: true }
        );
    }

    const updatedCart = await cartModel.findOne({ userId: req.user._id });
    return res.json({ message: "success", cart: updatedCart });
};

export const remove = async (req, res) => {
    const { productId } = req.params;
    const cart = await cartModel.findOneAndUpdate({ userId: req.user._id }, {
        $pull: {
            products: { productId },
        }
    }, { new: true })
    return res.json({ message: "success", cart });
};


export const clearCart = async (req, res) => {

    const cart = await cartModel.findOneAndUpdate({
        userId: req.user._id
    }, {
        products: [],
    }, {
        new: true,
    });
    return res.json({ message: "success", cart });

};



