const express=require('express')
const router=express.Router()

const user=require("../controllers/public")


router.post("/signup",user.addUser);
router.post("/login",user.login)



// router.get("/expense",user.expense)
// router.get("/style.css",user.style)




module.exports=router