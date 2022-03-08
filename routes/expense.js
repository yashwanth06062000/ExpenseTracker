const express=require('express')
const router=express.Router()

const user=require("../controllers/public")
const expense=require("../controllers/expense")
router.post("/addexpense",expense.addexpense);
module.exports=router