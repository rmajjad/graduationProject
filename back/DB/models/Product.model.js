import { Schema, Types, model } from "mongoose";


const productSchema = new Schema({
    name: {
        type: String,
        requered: true,
        unique: true,
        trim: true,
    },
    slug:{
        type: String,
        requered: true,
    },
    description:{
        type:String,
        requered: true,
    },
    stock:{
        type:Number,
        default:1,
    },
    price:{
        type:Number,
        required: true,
    },
    discount:{
        type:Number,
        default:0,
    },
    finalPrice:{
        type:Number,
    },
    mainImage: {
        type: Object,
        requered: true,
    },
    subImages:{
        type:Object,
    },
    status:{
        type: String,
        default: "Active",
        enum: ["Active", "NotActive"]
    },
    categoryId:{
        type:Types.ObjectId,
        ref: 'Category',
        required:true
    },
    
    createdBy:{
        type: Types.ObjectId,
        ref: 'User',
        
    },
    updatedBy:{
        type: Types.ObjectId,
        ref: 'User',
        
    },
},{
    timestamps: true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}    
    
});

productSchema.virtual('reviews',{
    ref:'Reviews',
    localField:'_id',
    foreignField:'productId'
})


const productModel = new model('Product', productSchema);
export default productModel;