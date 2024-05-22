

const Product = require("../models/product");



async function search(query, page, limit) {
    try {
        let products = await Product.find();
        let filteredProduct = [];

        products.forEach((product) => {
            if (product.name.toLowerCase().includes(query.toLowerCase()) || product.description.toLowerCase().includes(query.toLowerCase())) {
                filteredProduct.push(product);
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



module.exports = { search };
