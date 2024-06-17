const express=require('express')
const router=express.Router()
const sellerController=require('../controllers/sellerController')

router.post('/create',sellerController.createSeller)
router.get('/getdetails',sellerController.getDetailsForFilter)
router.post('/search',sellerController.getFilterData)
module.exports=router