// class APIFeatures {
//     constructor(query, queryStr) {
//         this.query = query;
//         this.queryStr = queryStr;
//     }

//     search() {
//         const { keyword } = this.queryStr || '';
//         const searchQuery = keyword ? { name: { $regex: keyword, $options: 'i' } } : {};

//         this.query = this.query.find({ ...searchQuery });
//         return this;
//     }


//     filter() {
//         // Make a copy of queryStr
//         const queryCopy = { ...this.queryStr }; // Change this.queryStr to this.queryParams

//         // Removing fields from the query
//         const removeFields = ['keyword', 'limit', 'page'];
//         removeFields.forEach(el => delete queryCopy[el]);

//         // Convert queryCopy to MongoDB query syntax
//         let queryStr = JSON.stringify(queryCopy);
//         queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

//         // Parse the modified query string and apply the filter
//         this.query = this.query.find(JSON.parse(queryStr));

//         return this;
//     }

//     pagination(resPerPage) {
//         const currentPage = Number(this.queryStr.page) || 1;
//         const skip = resPerPage * (currentPage - 1);

//         this.query = this.query.limit(resPerPage).skip(skip);
//         return this;
//     }


// }

// module.exports = APIFeatures;



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
        console.error("Greška prilikom pretrage proizvoda:", error);
        return { error: "Greška prilikom pretrage proizvoda" };
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