
const expense=require('../models/expense')

exports.addexpense=(async (req,res,next)=>{
    const money=req.body.money;
    const description=req.body.description;
    const category=req.body.category
    
    req.user.createExpense({
        ctegory:category,
        money:money,
        description:description
    }).then(()=>{
        res.json({message:"successfully added"})
    })
})


exports.getexpenses=(async (req,res,next)=>{
    req.user.getExpenses().then((expenses)=>{
        res.json({expenses})

    }).catch(err=>console.log(err))
})

exports.deleteexpense=(async (req,res,next)=>{
    const dltid=req.body.id;
    expense.findByPk(dltid).then((expensed)=>{
         expensed.destroy();
         res.send(201);



    }).catch(err=>console.log(err))
    

})

