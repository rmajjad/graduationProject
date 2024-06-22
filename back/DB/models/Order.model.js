import { Schema, Types, model } from "mongoose";


const orderSchema = new Schema({
    userId:{
        type:Types.ObjectId,
        ref:'User',
        required:true,
    },
    products:[{
        productName:{
            type:String,
        },
        productId:{
            type:Types.ObjectId,
            ref:'Product',
            required:true,
        },
        quantity:{
            type:Number,
            default:1,
            required:true,
        },
        price:{
            type:Number,
            required:true,
        },
        finalPrice:{
            type:Number,
            required:true,
        },
        mainImage: {
            type: Object,
            requered: true,
        },
    }],
    
    finalPrice:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:Number,
        required:true,
    },
    paymentType:{
        type:String,
        enum:['cash','cart'],
        default:'cash',
        required:true,
    },
    couponId:{
        type:Types.ObjectId,
        ref:'Coupon',
    },
    status:{
        type: String,
        default: "pending",
        enum: ["pending", "cancelled","confirmed","onway","delivered" ]
    },
    notes:{
        type:String,
    },
    rejectReason:{
        type:String,
    },
    updatedBy:{
        type:Types.ObjectId,
        ref:'User',
        required:true,
    }
},{
    timestamps: true,
    
});


const orderModel = new model('Order', orderSchema);
export default orderModel;