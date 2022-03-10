const express=require('express')
const router=express.Router()


const purchase=require("../controllers/purchase")


router.post("/buypremium",purchase.buypremium)
router.post("/updatetransactionstatus",purchase.updatetransactionstatus)
router.post("/is_premium",purchase.is_premium)




module.exports=router