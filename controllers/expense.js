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
