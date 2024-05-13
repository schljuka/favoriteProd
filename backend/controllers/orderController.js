const Order = require('../models/order');
const Product = require('../models/product');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')



// Create a new order    /api/order/new

exports.newOrder = catchAsyncErrors(async (req, res, next) => {

    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    })


    for (const item of orderItems) {
        await updateStock(item.product, item.quantity);
    }

    res.status(200).json({
        succes: true,
        order
    })

})


// Get single  order    /api/order/:id
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {

    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (!order) {
        return next(new ErrorHandler('No order found with this ID', 404))
    }


    res.status(200).json({
        success: true,
        order
    })

})


// Get loged in user orders      /api/orders/me
exports.myOrders = catchAsyncErrors(async (req, res, next) => {

    const orders = await Order.find({ user: req.user.id })

    res.status(200).json({
        success: true,
        orders
    })

})

// Get all orders     /api/admin/orders
exports.allOrders = catchAsyncErrors(async (req, res, next) => {

    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })

})


// Update / Process order     /api/admin/order/_id
// exports.updateOrder = catchAsyncErrors(async (req, res, next) => {

//     const order = await Order.findById(req.params.id);

//     if (order.orderStatus === 'Delivered') {
//         return next(new ErrorHandler('You have already delivered this order', 400))
//     }

//     order.orderItems.forEach(async item => {
//         await updateStock(item.product, item.quantity)
//     })

//     order.orderStatus = req.body.status;
//     order.deliveredAt = Date.now();

//     await order.save()

//     res.status(200).json({
//         success: true
//     })

// })

exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler('Order not found', 404));
    }

    if (order.orderStatus === status) {
        return next(new ErrorHandler('Order status remains unchanged', 400));
    }

     if (order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('You have already delivered this order', 400))
    }

    order.orderStatus = status;
    order.deliveredAt = status === 'Delivered' ? Date.now() : null;

    await order.save();

    res.status(200).json({
        success: true
    });
});



async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.stock = product.stock - quantity;

    await product.save({ validateBeforeSave: false });
}


// Delete order    /api/admin/order/:id
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler('No order found with this ID', 404))
    }

    await order.deleteOne();


    res.status(200).json({
        success: true
    })

})