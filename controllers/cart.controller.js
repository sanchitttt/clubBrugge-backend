const CartService = require('../service/cart.service');
const TokenService = require('../service/token.service');
const TokenServiceInstance = new TokenService();
const CartServiceInstance = new CartService();

const getCart = async (req, res) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            res.json([]);
        }
        else {
            const decodedToken = TokenServiceInstance.decodeToken(token);
            res.json(decodedToken);
        }
    } catch (error) {
        throw new Error(error);
    }
}

const addToCart = async (req, res) => {
    try {
        console.log('called');
        const { token } = req.cookies;
        const generatedToken = TokenServiceInstance.postCartToken(token, req.body);
        console.log(generatedToken)
        res.cookie('token', generatedToken, { httpOnly: true, secure: true, sameSite: 'None' });
        res.end();
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

const deleteFromCart = (req, res) => {
    try {
       
        const { productId } = req.params;
        const { token } = req.cookies;
        const generatedToken = TokenServiceInstance.deleteItemFromCart(token, productId);
        res.cookie('token', generatedToken, { httpOnly: true, secure: true, sameSite: 'None' });
        res.end();
    } catch (error) {
        throw new Error(error);
    }
}



module.exports = { getCart, addToCart, deleteFromCart };