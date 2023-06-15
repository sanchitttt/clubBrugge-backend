const mongoose = require('mongoose');

/**
 * "coverImage": "https://i.ibb.co/1M1k24x/image.png",
    "selectedSize": "S",
    "productId": "648a282ded72d6a000ca400c",
    "price": 20,
    "name": "T-shirt Club Badge Navy"
 */
const cartSchema = new mongoose.Schema({
    coverImage: String,
    selectedSize: Number,
    productId: mongoose.Types.ObjectId,
    price: Number,
    name: String,
    quantity: Number
});

const Cart = mongoose.model('cart', cartSchema);

module.exports = Cart;