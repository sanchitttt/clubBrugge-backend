const fs = require('fs');

const getSummerProduct = (req, res) => {
    try {
        fs.readFile(`${__dirname}/summer.json`, 'utf-8', function (err, data) {
            const parsedData = JSON.parse(data);
            let foundObj = null;
            for (let i = 0; i < parsedData.length; i++) {
                console.log(parsedData[i]._id,req.params._id)
                if (parsedData[i]._id === req.params._id) {
                    foundObj = parsedData[i];
                    break;
                }
            }
            if (foundObj) {
                res.json(foundObj)
            }
            else {
                res.json(null);
            }
        })
    } catch (error) {
        throw new Error(error);
    }
}
const getNewProduct = (req, res) => {
    try {
        fs.readFile(`${__dirname}/newItems.json`, 'utf-8', function (err, data) {
            const parsedData = JSON.parse(data);
            let foundObj = null;
            for (let i = 0; i < parsedData.length; i++) {
                if (parsedData[i]._id === req.params._id) {
                    foundObj = parsedData[i];
                    break;
                }
            }
            if (foundObj) {
                res.json(foundObj)
            }
            else {
                res.json(null);
            }
        })
    } catch (error) {
        throw new Error(error);
    }
}
const getClothingProduct = (req, res) => {
    try {
        fs.readFile(`${__dirname}/clothing.json`, 'utf-8', function (err, data) {
            const parsedData = JSON.parse(data);
            let foundObj = null;
            for (let i = 0; i < parsedData.length; i++) {
                if (parsedData[i]._id === req.params._id) {
                    foundObj = parsedData[i];
                    break;
                }
            }
            if (foundObj) {
                res.json(foundObj)
            }
            else {
                res.json(null);
            }
        })
    } catch (error) {
        throw new Error(error);
    }
}
const getFanArticleProduct = (req, res) => {
    try {
        fs.readFile(`${__dirname}/fanArticles.json`, 'utf-8', function (err, data) {
            const parsedData = JSON.parse(data);
            let foundObj = null;
            for (let i = 0; i < parsedData.length; i++) {
                if (parsedData[i]._id === req.params._id) {
                    foundObj = parsedData[i];
                    break;
                }
            }
            if (foundObj) {
                res.json(foundObj)
            }
            else {
                res.json(null);
            }
        })
    } catch (error) {
        throw new Error(error);
    }
}
const getOfficialCompetitionUniformProduct = (req, res) => {
    try {
        fs.readFile(`${__dirname}/officialCompetitionUniforms.json`, 'utf-8', function (err, data) {
            const parsedData = JSON.parse(data);
            let foundObj = null;
            for (let i = 0; i < parsedData.length; i++) {
                if (parsedData[i]._id === req.params._id) {
                    foundObj = parsedData[i];
                    break;
                }
            }
            if (foundObj) {
                res.json(foundObj)
            }
            else {
                res.json(null);
            }
        })
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getSummerProduct,
    getNewProduct,
    getOfficialCompetitionUniformProduct,
    getClothingProduct,
    getFanArticleProduct
}