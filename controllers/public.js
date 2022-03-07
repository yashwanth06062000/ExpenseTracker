const encript=require('bcryptjs');
const user=require('../models/usersignup')
exports.addUser=((req,res,next)=>{
    const name=req.body.name;
    const emain=req.body.email;
    const mobileno=req.body.phoneno
    const password=req.body.password;
    const hashpassword= await encript.hash(password,10);
    const exsitinguser=undefined;
    user.getusers({where:{name:name,email:emain}})
    .then((res)=>{
        existinguser=res;

    })
    if(exsitinguser != undefined){
    await user.createUser({name:name,
    email:emain,
    phoneno:mobileno,
    password:hashpassword  }).then((result)=>{
        console.log(result).catch((err)=>console.log(err))
        res.status(200).send('SuccesfullyaddedUser')
    }
    )}
    else{
        res.send("User Already exits")
        
    }


})