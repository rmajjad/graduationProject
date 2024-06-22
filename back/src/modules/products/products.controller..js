import slugify from "slugify";
import categoryModel from "../../../DB/models/Category.model.js";
import productModel from "../../../DB/models/Product.model.js";
import cloudinary from "../../utils/cloudinary.js";
import { pagenation } from "../../utils/pagenation.js";
import { AppError } from "../../utils/AppError.js";

export const create = async (req, res) => {

    const { name, price, discount, categoryId, description } = req.body;
    const checkCategory = await categoryModel.findById(categoryId);



    if (!checkCategory) {
        return res.status(404).json({ message: "Category not found" });
    }

    if (await productModel.findOne({ name })) {
        return res.status(409).json({ message: "product already exists" });
    } else {
        req.body.slug = slugify(name);
        req.body.finalPrice = price - ((price * (discount || 0)) / 100);

        const { secure_url, public_id } = await cloudinary.uploader.upload(req.files.mainImage[0].path, { folder: `${process.env.APPNAME}/product/${name}` });
        req.body.mainImage = { secure_url, public_id };
        req.body.subImages = [];
        if (req.files.subImages) {
            for (const file of req.files.subImages) {
                const { secure_url, public_id } = await cloudinary.uploader.upload(file.path,
                    { folder: `${process.env.APPNAME}/product/${name}/subImages` });
                req.body.subImages.push({ secure_url, public_id });
            }
        }

        const product = await productModel.create(req.body);
        return res.json({ message: "success", product });
    }
}
export const getAll = async (req, res) => {
    const { skip, limit } = pagenation(req.query.page, req.query.limit);
    const products = await productModel.find({}).skip(skip).limit(limit).populate({
        path: 'reviews',
        populate: {
            path: 'userId',
            select: 'userName -_id'
        }

    });
    const count = await productModel.estimatedDocumentCount();

    return res.status(200).json({ message: "success", count, products });
};

export const productDetails = async (req, res, next) => {

    const product = await productModel.findById(req.params.productId).populate({
        path: 'reviews',
        populate: {
            path: 'userId',
            select: 'userName -_id'
        }

    });
    if (!product) {
        return next(new AppError(`Product not found`, 404));
    }
    return res.status(200).json({ message: "success", product });
};

export const getPro_C = async (req, res) => {
    const { categoryId } = req.params;
    const { skip, limit } = pagenation(req.query.page, req.query.limit);
    const products = await productModel.find({ categoryId }).skip(skip).limit(limit).populate({
        path: 'reviews',
        populate: {
            path: 'userId',
            select: 'userName -_id'
        }

    });
    const count = await productModel.countDocuments({ categoryId });

    return res.status(200).json({ message: "success", count, products });


};


export const update = async (req, res, next) => {
    const product = await productModel.findById(req.params.id);

    if (!product) {
        return next(new AppError(`Product not found`, 404));
    }
    product.name = req.body.name;
    if (await productModel.findOne({ name: req.body.name, _id: { $ne: req.params.id } })) {
        return next(new AppError(`product already exists`, 409));

    }

    product.slug = slugify(req.body.name);
    if (req.file) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
            folder: `${process.env.APPNAME}/products`
        });
        await cloudinary.uploader.destroy(product.image.public_id);

        product.image = { secure_url, public_id };
    }
    product.status = req.body.status;
    product.description = req.body.description;
    product.stock = req.body.stock;
    product.price = req.body.price;
    product.discount = req.body.discount || 0;
    product.finalPrice = req.body.price - ((req.body.price * (req.body.discount || 0)) / 100);


    await product.save();

    return res.json({ message: "success", product });
};

export const destroy = async (req, res, next) => {
    const product = await productModel.findByIdAndDelete(req.params.id);

    if (!product) {
        return next(new AppError(`product not found`, 404));
    }
    await cloudinary.uploader.destroy(product.mainImage.public_id);

    return res.status(200).json({ message: "success", product });
};