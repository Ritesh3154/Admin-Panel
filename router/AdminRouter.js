const router = require('express').Router()
const sendEmail = require('../config/Mail')
const AdminController = require('../controller/AdminController')
const upload = require('../middleware/uploadFile')


router.post('/register', AdminController.register)
router.post('/login', AdminController.login)
router.post('/updateprofile', upload.single('admin_profile'), AdminController.updateprofile)
router.post('/changepassword', AdminController.ChangePassword)
// router.get('/sendmail',async(req,res)=>{
//     await sendEmail('vyashelly501@gmail.com','check your email!!')
// })
router.post('/forgotpwd', AdminController.forgotPassword)
router.post('/updatepwd', AdminController.update_password)

module.exports = router