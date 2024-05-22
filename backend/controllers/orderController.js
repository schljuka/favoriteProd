const Order = require('../models/order');
const Product = require('../models/product');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')



// Create a new order    /api/order/new

// exports.newOrder = catchAsyncErrors(async (req, res, next) => {

//     const {
//         orderItems,
//         itemsPrice,

//     } = req.body;

//     const user = req.user;


//     const order = await Order.create({
//         orderItems,

//         itemsPrice,

//         user: req.user._id,
//         userName: req.user.name,
//     })


//     for (const item of orderItems) {
//         await updateStock(item.product, item.quantity);
//     }

//     res.status(200).json({
//         succes: true,
//         order
//     })

// })


exports.newOrder = catchAsyncErrors(async (req, res, next) => {

    const {
        orderItems,
    } = req.body;

    const user = req.user;

    // Provera da li korisnik već ima postojeći redosled
    let existingOrder = await Order.findOne({ user: req.user._id });

    if (existingOrder) {
        // Ako postoji, dodajte nove stavke u postojeći redosled
        existingOrder.orderItems.push(...orderItems);
        await existingOrder.save();

        for (const item of orderItems) {
            await updateStock(item.product, -item.quantity);
        }

        res.status(200).json({
            success: true,
            order: existingOrder
        });
    } else {

        const order = await Order.create({
            orderItems,
            user: req.user._id,
            userName: req.user.name,
        });

        for (const item of orderItems) {
            await updateStock(item.product, -item.quantity);
        }

        res.status(200).json({
            success: true,
            order
        });
    }
});



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

    // let totalAmount = 0;

    // orders.forEach(order => {
    //     totalAmount += order.totalPrice
    // })

    res.status(200).json({
        success: true,
        // totalAmount,
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




exports.deleteItemFromOrder = catchAsyncErrors(async (req, res, next) => {
    const { orderId, itemId } = req.params;

    // Find the order by ID
    const order = await Order.findById(orderId);

    if (!order) {
        return next(new ErrorHandler('No order found with this ID', 404));
    }

    // Find the index of the item to be removed
    const itemIndex = order.orderItems.findIndex(item => item._id.toString() === itemId);

    if (itemIndex === -1) {
        return next(new ErrorHandler('No item found with this ID in the order', 404));
    }

    // Remove the item from the order
    const item = order.orderItems[itemIndex];
    order.orderItems.splice(itemIndex, 1);

    // Update the stock of the removed item
    await updateStock(item.product, +item.quantity); // Restore the stock by adding back the quantity

    // Save the updated order
    await order.save();

    res.status(200).json({
        success: true,
        order
    });
});

// Update the stock function
async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.stock = product.stock + quantity;

    await product.save({ validateBeforeSave: false });
}