import cartModel from "../../../DB/models/Cart.model.js";


export const get = async (req, res) => {
    const cart = await cartModel.findOne({ userId: req.user._id });
    return res.json({ message: "success", products: cart.products });
};

export const create = async (req, res) => {
    const { productId } = req.body;
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
            return res.json({ message: "product already exists" });
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



