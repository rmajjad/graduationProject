import { Schema, Types, model } from "mongoose";


const chatSchema = new Schema({
    userId:{
        type: Types.ObjectId,
        ref: 'User',
        requered: true,
    },
    message:{
        type:String,
        requered: true,
    },
    medicine:{
        type:String,
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

const chatModel = new model('Chat', chatSchema);
export default chatModel;