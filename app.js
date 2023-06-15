const express = require('express');
const { getSummerClothing, getOfficialCompetitionUniforms, getClothing, getFanArticles, getNewClothing } = require('./controllers/productsList.controller');
const app = express();
const cors = require('cors');
const { getFanArticleProduct, getOfficialCompetitionUniformProduct, getSummerProduct, getNewProduct, getClothingProduct } = require('./controllers/product.controller');
const { getCart, addToCart, deleteFromCart } = require('./controllers/cart.controller');

app.use(cors());
app.use(express.json());

app.get('/summer', getSummerClothing);
app.get('/official-competition-uniforms', getOfficialCompetitionUniforms);
app.get('/clothing', getClothing);
app.get('/fan-articles', getFanArticles);
app.get('/new', getNewClothing);

app.get('/summerProduct/:_id', getSummerProduct);
app.get('/newProduct/:_id', getNewProduct);
app.get('/clothingProduct/:_id', getClothingProduct);
app.get('/fanArticleProduct/:_id', getFanArticleProduct);
app.get('/officialCompetitionUniformProduct/:_id', getOfficialCompetitionUniformProduct)


app.get('/cart', getCart);
app.post('/cart', addToCart);
app.delete('/cart/:productId', deleteFromCart);

app.use((err, req, res, next) => {
    console.log(err);
})

module.exports = app;