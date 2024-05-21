

const Product = require("../models/product");



async function search(name, page, limit) {
    try {
        let products = await Product.find();
        let filteredProduct = [];

        products.forEach((product) => {
            if (name) {
                if (product.name.toLowerCase().includes(name.toLowerCase()) && !filteredProduct.some(b => b['name'] === name)) {
                    filteredProduct.push(product);
                }
            }
        });

        return paginateProducts(filteredProduct, page, limit);
    } catch (error) {
        console.error("Error with search product: ", error);
        return { error: "Error with search product:" };
    }
}

async function paginateProducts(products, page, limit) {
    let pageProducts = [];

    const pages = Math.ceil(products.length / limit);

    if (page === pages) {
        const startPoint = (page - 1) * Number(limit);
        pageProducts = products.slice(startPoint);
    } else {
        const startPoint = (page - 1) * limit;
        const endPoint = startPoint + limit;
        pageProducts = products.slice(startPoint, endPoint);
    }

    const pageObject = {
        totalCount: products.length,
        currentPage: page,
        totalPages: pages,
        limit: limit,
        pageCount: pageProducts.length,
        items: pageProducts
    };

    return pageObject;
}







async function paginateAllProducts(page, limit) {
    try {
        const totalCount = await Product.countDocuments();
        const totalPages = Math.ceil(totalCount / limit);

        const products = await Product.find()
            .skip((page - 1) * limit)
            .limit(limit);

        return {
            totalCount,
            currentPage: page,
            totalPages,
            limit,
            pageCount: products.length,
            items: products
        };
    } catch (error) {
        console.error("Error paginating products:", error);
        return { error: "Error paginating products." };
    }
}

module.exports = { search, paginateAllProducts };
