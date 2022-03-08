const encript=require('bcryptjs');
const user=require('../models/usersignup')




const jwt = require('jsonwebtoken');



function generateAccessTocken(id){
    return jwt.sign(id,process.env.Tokensecrect)
}



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
exports.login=(async (req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password
    user.findAll({where:{email:email}}).then(result=>{
        if(result[0]!=undefined){
        encript.compare(password,result[0].password,function(err,response){
            if(err){
                console.log(result[0].name)
                return res.json({success: false, message: 'Something went wrong'})
            }
            if(response){
                console.log("i am here inside response")
                const jwttoken=generateAccessTocken(result[0].id)
                res.json({token: jwttoken, success: true, message: 'Successfully Logged In'})
               
             }
            else{
                console.log("i am here inside not found")
                return res.status(401).json({success: false, message: 'passwords do not match'});
               
            }

        })}
        else{
            return res.status(404).json({success: false, message: 'User not found'});

        }
    }).catch(err=>console.log(err))
})












