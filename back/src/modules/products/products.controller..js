import slugify from "slugify";
import categoryModel from "../../../DB/models/Category.model.js";
import productModel from "../../../DB/models/Product.model.js";
import cloudinary from "../../utils/cloudinary.js";

export const create = async(req,res) => {
        
    const {name,price,discount,categoryId} = req.body;
    const checkCategory = await categoryModel.findById(categoryId);
    
    

    if(!checkCategory){
        return res.status(404).json({message: "Category not found"});
    }
    
    if(await productModel.findOne({name})){
        return res.status(409).json({message:"product already exists"});
    }else{
    req.body.slug = slugify(name);
    req.body.finalPrice = price - ((price*(discount||0))/100);
        
    const {secure_url,public_id} = await cloudinary.uploader.upload(req.files.mainImage[0].path, {folder: `${process.env.APPNAME}/product/${name}`});
    req.body.mainImage = {secure_url,public_id}; 
    req.body.subImages = [];
    for (const file of req.files.subImages) {
    const {secure_url,public_id} = await cloudinary.uploader.upload(file.path, 
        {folder: `${process.env.APPNAME}/product/${name}/subImages`});
        req.body.subImages.push({secure_url,public_id});
    }
    
    
    const product = await productModel.create(req.body);
    return res.json({message:"success",product});
}
}
export const getAll = async(req, res) => {
    const products = await productModel.find({}).populate([{
        path: "createdBy",
        select: "userName"
    },
    {
        path: "updatedBy",
        select: "userName"
    }
]);

    return res.status(200).json({message:"success",products});
};