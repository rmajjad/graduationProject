import { Schema, Types, model } from "mongoose";


const cartSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        requered: true,
        unique: true,
    },
    products: [{
        productId:{type: Types.ObjectId,ref: 'Product',required: true},
        quantity: {type: Number,default:1}
    }],
    
},{
    timestamps: true,
    
});


const cartModel = new model('Cart', cartSchema);
export default cartModel;