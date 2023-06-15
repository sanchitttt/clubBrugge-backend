const Cart = require("../modal/Cart.modal");

class ClassService {
    async delete(productId) {
        try {
            const cartItems = await Cart.findOneAndDelete({ "productId": productId })
            return cartItems;
        } catch (error) {
            throw new Error(error);
        }
    }
    async get() {
        try {
            const cartItems = await Cart.find({});
            return cartItems;
        } catch (error) {
            throw new Error(error);
        }
    }
    async post(product) {
        try {
            const alreadyInCart = await Cart.findOne({ "productId": product.productId })
            if (alreadyInCart) {
                const updated = await Cart.findOneAndUpdate({ "productId": product.productId }, product);
                return updated;
            }
            else {
                const newItem = await Cart.create(product);
                return newItem;
            }


        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = ClassService;