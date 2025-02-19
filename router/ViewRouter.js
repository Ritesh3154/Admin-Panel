const Admin = require('../model/AdminModel')
const category = require('../model/CategoryModel')
const CategoryModel = require('../model/CategoryModel')
const Product = require('../model/ProductModel')
const SubCat = require('../model/SubCat-model')
const { matchLogin } = require('../utils/LoginMiddleware')

const router = require('express').Router()

router.get('/', (req, res) => {
    // res.render('pages/index')
    matchLogin(req, res, 'pages/index')
})
router.get('/AddCategory', (req, res) => {
    res.render('pages/AddCategory')
    // matchLogin(req, res, 'pages/AddCategory')
})
router.get('/ViewCategory', async (req, res) => {
    const category = await CategoryModel.find()
    // console.log(category);
    res.render('pages/ViewCategory', { category })
})
router.get('/updatecat', async (req, res) => {
    const { id } = req.query
    const category = await CategoryModel.findById(id)
    // console.log(category);
    res.render('pages/UpdateCategory', { category })
})

router.get('/login', (req, res) => {
    res.render('pages/login', { message: req.flash('info') })
})
router.get('/register', (req, res) => {
    res.render('pages/register')
})

router.get('/logout', (req, res) => {
    res.clearCookie('admin')
    res.redirect('/login')
})
router.get('/myprofile', async (req, res) => {

    const cookieData = req.cookies.admin
    console.log(cookieData)
    console.log(cookieData.email)

    const email = cookieData.email
    const singleAdmin = await Admin.findOne({ email })

    // const admin = req.cookies.admin
    res.render('pages/MyProfile', { admin: singleAdmin })
})

router.get('/ChangePassword', async (req, res) => {
    const email = req.cookies.admin.email
    res.render('pages/ChangePassword', { email })
})
router.get('/updatepwd', (req, res) => {
    res.render('pages/Change-ForgotPwd', { message: req.flash('info') })
})
router.get('/addsubcat', async (req, res) => {
    const categories = await category.find()
    res.render('pages/AddSubCategory', { categories })
})
router.get('/viewsubcat', async (req, res) => {
    const subcategories = await SubCat.find().populate('category')
    res.render('pages/ViewSubCategory', { subcategories })
})
router.get('/UpdateSubCategory', async (req, res) => {
    const { id } = req.query
    const categories = await category.find()
    const subcategories = await SubCat.findById(id).populate('category')
    res.render('pages/UpdateSubCategory', { categories, subcategories })
})

router.get('/addProduct', async (req, res) => {
    const categories = await category.find()

    const { cat_id } = req.query
    var subcategories
    var selectCategories = req.query.cat_id || ""

    if (cat_id) {
        subcategories = await SubCat.find({ category: cat_id })
    }

    res.render('pages/AddProduct', { categories, subcategories, selectCategories })
})
router.get('/viewProduct', async (req, res) => {
    const categories = await category.find();
    const subCategories = await SubCat.find()
    const product = await Product.find().populate("category").populate("subCategory");
    res.render('pages/ViewProduct', { product, categories, subCategories })
})

router.get('/updateProduct', async (req, res) => {
    const { id, cat_id } = req.query;

    const categories = await category.find();
    const SingleProduct = await Product
        .findOne({ _id: id })
        .populate("category")
        .populate("subCategory");

    let subCategories;
    if (cat_id) {
        subCategories = await SubCat.find({ category: cat_id });
    } else {
        subCategories = await SubCat.find({ category: SingleProduct.category?._id });
    }

    const selectCat = cat_id || SingleProduct.category?._id.toString();

    res.render("pages/updateProduct", {
        categories,
        subCategories,
        SingleProduct,
        selectCat,
    });
})




module.exports = router