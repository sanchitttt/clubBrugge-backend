const CartService = require('../service/cart.service');
const CartServiceInstance = new CartService();

const getCart = async (req, res) => {
    try {
        const result = await CartServiceInstance.get();
        res.json(result);
    } catch (error) {
        throw new Error(error);
    }
}

const addToCart = async (req, res) => {
    try {
        const result = await CartServiceInstance.post(req.body);
        res.json(result);
    } catch (error) {
        throw new Error(error);
    }
}

const deleteFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const result = await CartServiceInstance.delete(productId);
        res.json(result);
    } catch (error) {
        throw new Error(error);
    }
}



module.exports = { getCart, addToCart, deleteFromCart };