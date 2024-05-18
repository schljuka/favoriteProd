
const User = require('../models/user')
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require('jsonwebtoken')


// Checks if user is authenticated or not
// ORIGINAL
// exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {

//     const { token } = req.cookies

//     if (!token) {
//         return next(new ErrorHandler('Login first to acces this resource.', 401))
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET)
//     req.user = await User.findById(decoded.id);

//     next();
// })



// STANISLAV
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {

    const bearerHeader = req.headers['authorization'];
    if (!bearerHeader) {
        return res.sendStatus(403);
    }
    else {
        const bearerToken = bearerHeader.split(' ')[1];
        let data = await jwt.verify(bearerToken, process.env.JWT_SECRET);
        console.log(data)
        req.user = await User.findById(data.id);
    }
    next();
})





// Handling users roles
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource`, 403))
        }
        next()
    }
}