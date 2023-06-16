const jwt = require('jsonwebtoken');

class TokenService {
    postCartToken(token, cartItem) {
        if (!token) {
            console.log('token not already there')
            const payload = {
                cartItems: [cartItem]
            }
            const generatedToken = jwt.sign(payload, process.env.TOKEN_SECRET);
            return generatedToken;
        }
        else {
            const decodedValue = jwt.decode(token);
            let alreadyInCart = false;
            for (let i = 0; i < decodedValue.cartItems.length; i++) {
                if (decodedValue.cartItems[i].productId === cartItem.productId) {
                    alreadyInCart = true;
                    decodedValue.cartItems[i] = cartItem;
                    break;
                }
            }
            if (!alreadyInCart) decodedValue.cartItems.push(cartItem);
            const regeneratedToken = jwt.sign(decodedValue, process.env.TOKEN_SECRET);
            return regeneratedToken;
        }
    }
    decodeToken(token) {
        const decodedValue = jwt.decode(token);
        return decodedValue;
    }
    deleteItemFromCart(token, productId) {
        try {
            console.log(token, productId);
            const decodedValue = jwt.decode(token);
            const filteredCartItems = [];
            console.log(decodedValue)
            for (let i = 0; i < decodedValue.cartItems.length; i++) {
                if (decodedValue.cartItems[i].productId !== productId) {
                    filteredCartItems.push(decodedValue.cartItems[i]);
                }
            }
            const payload = {
                cartItems: filteredCartItems
            }
            const newToken = jwt.sign(payload, process.env.TOKEN_SECRET);
            return newToken;
        } catch (error) {
            throw new Error(error);
        }

    }
}

module.exports = TokenService;