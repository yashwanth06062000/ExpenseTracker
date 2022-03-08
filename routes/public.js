const express=require('express')
const router=express.Router()

const user=require("../controllers/public")
const expense=require("../controllers/expense")


router.post("/signup",user.addUser);
router.post("/login",user.login);








module.exports=router