const CategoryController = require('../controller/CategoryController')

const router = require('express').Router()

router.post('/', CategoryController.Store)
router.get('/:id',CategoryController.trash)
router.post('/:id',CategoryController.update)
module.exports = router