const fs = require('fs');

const getSummerClothing = (req, res) => {
    try {
        fs.readFile(`${__dirname}/summer.json`, 'utf-8', function (err, data) {
            const parsedData = JSON.parse(data);
            res.json(parsedData);
        })
        // res.json(summer);
    } catch (error) {
        throw new Error("Resource fetching failed!")
    }
}

const getOfficialCompetitionUniforms = (req, res) => {
    try {
        fs.readFile(`${__dirname}/officialCompetitionUniforms.json`, 'utf-8', function (err, data) {
            const parsedData = JSON.parse(data);
            const filteredProducts = [];
            if (Object.keys(req.query).length) {
                for (let i = 0; i < parsedData.length; i++) {
                    let allConditionsPass = true;
                    for (const property in req.query) {
                        if (property === 'competitionKit') {
                            if (parsedData[i].competitionKit !== req.query[property].toLowerCase()) {
                                allConditionsPass = false;
                                continue;
                            }
                        }
                        if (property === 'size') {
                            const set = new Set(req.query[property].split(','));
                            let productAvailableUnitsKeys = Object.keys(parsedData[i].availableUnits);
                            let sizeConditionPassed = false;
                            for (let j = 0; j < productAvailableUnitsKeys.length; j++) {
                                if (set.has(productAvailableUnitsKeys[j]) && parsedData[i].availableUnits[productAvailableUnitsKeys[j]] > 0) {
                                    sizeConditionPassed = true;
                                    continue;
                                }
                            }
                            if (!sizeConditionPassed) {
                                allConditionsPass = false;
                                break;
                            }
                        }
                        if (property === 'gender') {
                            if (parsedData[i].genderType !== 'all' && parsedData[i].genderType !== req.query.gender) {
                                allConditionsPass = false;
                                break;
                            }
                        }
                        if (property === 'minPrice') {
                            if (parsedData[i].price < parseInt(req.query.minPrice)) {
                                allConditionsPass = false;
                                break;
                            }
                        }
                        if (property === 'maxPrice') {
                            if (parsedData[i].price > parseInt(req.query.maxPrice)) {
                                allConditionsPass = false;
                                break;
                            }
                        }
                        if (property === 'color') {
                            let colorMatchFound = false;
                            for (let j = 0; j < parsedData[i].color.length; j++) {
                                if (parsedData[i].color[j] === req.query.color) {
                                    colorMatchFound = true;
                                }
                            }
                            if (!colorMatchFound) {
                                allConditionsPass = false;
                            }
                        }
                    }
                    if (allConditionsPass) {
                        filteredProducts.push(parsedData[i]);
                    }
                }
                res.json(filteredProducts);
            }
            else {
                res.json(parsedData);
            }
        })
        // res.json(summer);
    } catch (error) {
        throw new Error("Resource fetching failed!")
    }
}

const getClothing = (req, res) => {
    try {
        fs.readFile(`${__dirname}/clothing.json`, 'utf-8', function (err, data) {
            const parsedData = JSON.parse(data);
            const { query } = req;
            if (Object.keys(req.query).length) {
                const filteredProducts = [];
                for (let i = 0; i < parsedData.length; i++) {
                    let allConditionsPass = true;
                    const product = parsedData[i];
                    for (const property in query) {
                        if (property === 'collectionType') {
                            if (product.clothingType === 'collection') {
                                if (product.collection !== query[property]) {
                                    allConditionsPass = false;
                                    break;
                                }
                            }
                            else {
                                allConditionsPass = false;
                                break;
                            }
                        }
                        if (parsedData[i].genderType !== 'all' && property === 'gender') {
                            if (product.genderType !== query[property]) {
                                allConditionsPass = false;
                                break;
                            }
                        }
                        if (property === 'clothingType') {
                            if (product.type !== query[property]) {
                                allConditionsPass = false;
                                break;
                            }
                        }
                        if (property === 'minPrice') {
                            if (product.price < parseInt(query.minPrice)) {
                                allConditionsPass = false;
                                break;
                            }
                        }
                        if (property === 'maxPrice') {
                            if (product.price > parseInt(query.maxPrice)) {
                                allConditionsPass = false;
                                break;
                            }
                        }
                        if (property === 'size') {
                            const set = new Set(query[property].split(','));
                            let productAvailableUnitsKeys = Object.keys(product.availableUnits);
                            let sizeConditionPassed = false;
                            for (let j = 0; j < productAvailableUnitsKeys.length; j++) {
                                if (set.has(productAvailableUnitsKeys[j]) && product.availableUnits[productAvailableUnitsKeys[j]] > 0) {
                                    sizeConditionPassed = true;
                                    continue;
                                }
                            }
                            if (!sizeConditionPassed) {
                                allConditionsPass = false;
                                break;
                            }
                        }
                    }
                    if (allConditionsPass) {
                        console.log('yes')
                        filteredProducts.push(product);
                    }
                }
                res.json(filteredProducts);
            }
            else res.json(parsedData);
        })
        // res.json(summer);
    } catch (error) {
        throw new Error("Resource fetching failed!")
    }
}
const getFanArticles = (req, res) => {
    try {
        fs.readFile(`${__dirname}/fanArticles.json`, 'utf-8', function (err, data) {
            const parsedData = JSON.parse(data);
            const { query } = req;
            if (Object.keys(query).length) {
                const filteredProducts = [];
                for (let i = 0; i < parsedData.length; i++) {
                    const product = parsedData[i];
                    let allConditionsPass = true;
                    for (const property in query) {
                        if (property === 'minPrice') {
                            if (product.price < parseInt(query.minPrice)) {
                                allConditionsPass = false;
                                break;
                            }
                        }
                        if (property === 'maxPrice') {
                            if (product.price > parseInt(query.maxPrice)) {
                                allConditionsPass = false;
                                break;
                            }
                        }
                    }
                    if (allConditionsPass) {
                        filteredProducts.push(product);
                    }
                }
                res.json(filteredProducts);
            }
            else res.json(parsedData);
        })
        // res.json(summer);
    } catch (error) {
        throw new Error("Resource fetching failed!")
    }
}
const getNewClothing = (req, res) => {
    try {
        fs.readFile(`${__dirname}/newItems.json`, 'utf-8', function (err, data) {
            const parsedData = JSON.parse(data);
            const { query } = req;
            if (Object.keys(query).length) {
                console.log(query)
                const filteredProducts = [];
                for (let i = 0; i < parsedData.length; i++) {
                    const product = parsedData[i];
                    let allConditionsPass = true;
                    for (const property in query) {
                        if (property === 'minPrice') {
                            if (product.price < parseInt(query[property])) {
                                allConditionsPass = false;
                                break;
                            }
                        }
                        if (property === 'maxPrice') {
                            if (product.price > parseInt(query[property])) {
                                allConditionsPass = false;
                                break;
                            }
                        }
                    }
                    if (allConditionsPass) {
                        filteredProducts.push(product);
                    }
                }
                res.json(filteredProducts)
            }
            else {
                res.json(parsedData);
            }
        })
        // res.json(summer);
    } catch (error) {
        throw new Error("Resource fetching failed!")
    }
}

module.exports = { getSummerClothing, getOfficialCompetitionUniforms, getClothing, getFanArticles, getNewClothing }