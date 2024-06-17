// Require the express module and create a new router object
const express=require('express')
const router=express.Router()
router.use('/',require('./home'))
router.use('/product',require('./product'))
router.use('/seller',require('./seller'))

module.exports=router