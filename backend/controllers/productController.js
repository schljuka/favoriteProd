const Product = require('../models/product');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
// const APIFeatures = require('../utils/apiFeatures');
const cloudinary = require('cloudinary');
const { search, paginateAllProducts } = require("../utils/apiFeatures");


// Create new product   /api/admin/product/new

exports.newProduct = catchAsyncErrors(async (req, res, next) => {

    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'products'
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.images = imagesLinks;

    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })

})


// Get all products    /api/products?keyword=apple

exports.getProductsByQuery = catchAsyncErrors(async (req, res, next) => {
    const { query, page = 1, limit = 6 } = req.query;
    let products;

    if (query) {
        products = await search(query, page, limit);
    } else {
        return res.status(400).json({ error: "Please provide a query for the search." });
    }

    res.status(200).json({ message: "Retrieved products from query", page: products });
});



// exports.getProducts = catchAsyncErrors(async (req, res, next) => {
//     try {
//         const products = await Product.find(); 
//         if (products)
//             res.status(200).json({ message: "Retrieved all products", products });
//     } catch (error) {
//         res.status(500).json({ message: "Unable to retrieve products at this time", error });
//     }
// });


exports.getProducts = catchAsyncErrors(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;
    
    const totalCount = await Product.countDocuments();
    const products = await Product.find().skip(skip).limit(limit);
    
    res.json({
        products,
        paging: {
            totalCount,
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit),
            limit
        }
    });
});




// Get all products (Admin)   /api/admin/products
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {

    const products = await Product.find();

    res.status(200).json({
        success: true,
        products

    })

})


// Get single product details   /api/product/:id
exports.getSingleProducts = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404))
    }
    res.status(200).json({
        success: true,
        product
    })
})


// Update Product  api/admin/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404))
    }


    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }


    if (images !== undefined) {
        // Deleteting images associated with the product
        for (let i = 0; i < product.images.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
        }

        let imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'products'
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        req.body.images = imagesLinks;
    }


    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidator: true,
        useFindAndModify: false
    });

    res.status(200).json({
        succsess: true,
        product
    })
})


// Delete Product   /api/admin/product/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404))
    }

    // Deleteting images associated with the product
    for (let i = 0; i < product.images.length; i++) {
        const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }

    await product.deleteOne();
    res.status(200).json({
        success: true,
        message: 'Product is deleted'
    })

})


