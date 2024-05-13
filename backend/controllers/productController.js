const Product = require('../models/product');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures');
const cloudinary = require('cloudinary');



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
// exports.getProducts = catchAsyncErrors(async (req, res, next) => {


//     const resPerPage = 6;

//     const productsCount = await Product.countDocuments();

//     const apiFeatures = new APIFeatures(Product.find(), req.query)
//         .search()
//         .filter()
//         .pagination(resPerPage)

//     const products = await apiFeatures.query;


//     res.status(200).json({
//         success: true,
//         productsCount,
//         resPerPage,
//         products
//     })



// })

exports.getProducts = catchAsyncErrors(async (req, res, next) => {
    const resPerPage = 6;
    let productsCount;


    if (req.query.category) {
        productsCount = await Product.countDocuments({ category: req.query.category });
    } else {
        productsCount = await Product.countDocuments();
    }

    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resPerPage)

    const products = await apiFeatures.query;

    res.status(200).json({
        success: true,
        productsCount,
        resPerPage,
        products
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


