import { Schema, Types, model } from "mongoose";


const categorySchema = new Schema({
    name: {
        type: String,
        requered: true,
    },
    slug:{
        type: String,
        requered: true,
    },
    image: {
        type: Object,
        requered: true,
    },
    status:{
        type: String,
        default: "Active",
        enum: ["Active", "NotActive"]
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
    timestamps: true
});

const categoryModel = new model('Category', categorySchema);
export default categoryModel;