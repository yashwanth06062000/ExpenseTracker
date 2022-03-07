const encript=require('bcryptjs');
const { mediumpurple } = require('color-name');
const user=require('../models/usersignup')
exports.addUser=(async(req,res,next)=>{
    const name=req.body.name;
    const emain=req.body.email;
    const mobileno=req.body.phone
    const password=req.body.password;
    const hashpassword= await encript.hash(password,10);
    const exsitinguser=undefined;
    user.findAll({where:{name:name,email:emain}})
    .then((res)=>{
        existinguser=res[0];
    })
    if(exsitinguser == undefined){
    await user.create({name:name,
    email:emain,
    phoneno:mobileno,
    password:hashpassword  }).then((result)=>{
        res.status(200).send('SuccesfullyaddedUser')}
    ).catch(err=>console.log(err))}   
    
    else{
        res.send("User Already exits")
        
    }


})
