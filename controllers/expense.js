
const expense=require('../models/expense')
const ledb=require("../models/leaderboard")

exports.addexpense=(async (req,res,next)=>{
    const money=req.body.money;
    const description=req.body.description;
    const category=req.body.category
    
    req.user.createExpense({
        ctegory:category,
        money:money,
        description:description
    }).then(  ()=>{
        console.log(req.user)
      req.user.getLeaderboard().then(async (e)=>{
         var value= e.dataValues.totalexpense
         value +=Number(money)
         await e.update({totalexpense: value}).then((e1)=>{console.log(e1)}).catch(err=>console.log(err))
        
        
    }).catch(err=>console.log(err))
    res.json({message:"successfully added"})
       
    
})})


exports.getexpenses=(async (req,res,next)=>{
    req.user.getExpenses().then((expenses)=>{
        res.json({expenses})

    }).catch(err=>console.log(err))
})

exports.deleteexpense=(async (req,res,next)=>{
    const dltid=req.body.id;
    expense.findByPk(dltid).then((expensed)=>{
        req.user.getLeaderboard().then(async (e)=>{
            // console.log(e,"i am e boy u are searching for")
            var value= e.dataValues.totalexpense
            value -=Number(expensed.money)
            await e.update({totalexpense: value})})

         expensed.destroy();
         res.sendStatus(201)



    }).catch(err=>console.log(err))
    

})

