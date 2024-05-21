const express = require("express");
const router = express.Router();

const {
    getProducts,
    getProductsByQuery,
    newProduct,
    getSingleProducts,
    updateProduct,
    deleteProduct,
    getAdminProducts,
    getProductsByPagination
} = require('../controllers/productController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')




module.exports = router;
router.route('/products').get(getProducts);
router.route('/products/query').get(getProductsByQuery);

router.route('/products/all').get(getProductsByPagination);

router.route('/admin/products').get(getAdminProducts);

router.route('/product/:id').get(getSingleProducts);

router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);



// router.route('/admin/product/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct);
router.route('/admin/product/:id').put(isAuthenticatedUser, updateProduct);



// router.route('/admin/product/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);
router.route('/admin/product/:id').delete(isAuthenticatedUser, deleteProduct);




module.exports = router;