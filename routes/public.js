const express=require('express')
const router=express.Router()

const user=require("../controllers/public")


router.post("/signup",user.addUser);
router.post("/login",user.login)
module.exports=router