const express = require('express')
const app = express()
exports.app = app
require('dotenv').config()
const PORT = process.env.PORT || 5000
const cookieParser = require('cookie-parser')

const session = require('express-session')
const flash = require('express-flash')

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use('/public', express.static("uploads/product"))
app.use('/public', express.static("uploads/admin"))


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/public', express.static('uploads'))

app.use(cookieParser())

app.use(flash())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

const CategoryRouter = require('./router/CategoryRouter')
app.use('/api/category', CategoryRouter)


const View = require('./router/ViewRouter')
app.use('/', View)

const Admin = require('./router/AdminRouter')
app.use('/api/register', Admin)

const subCatRouter = require('./router/SubCatRouter')
app.use('/api/subcat', subCatRouter)

const ProductRouter = require('./router/ProductRouter')
app.use('/api/product', ProductRouter)

require('./config/db').dbConnect()

const CategoryModel = require('./model/CategoryModel')

app.listen(PORT, () => console.log(`Example app listening on PORT http://localhost:${PORT}`))   