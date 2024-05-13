const express = require("express");
const router = express.Router();

const {
    getProducts,
    newProduct,
    getSingleProducts,
    updateProduct,
    deleteProduct,
    getAdminProducts
} = require('../controllers/productController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/products').get(getProducts);
router.route('/admin/products').get(getAdminProducts);

router.route('/product/:id').get(getSingleProducts);

router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);

router.route('/admin/product/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct);

router.route('/admin/product/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);



module.exports = router;