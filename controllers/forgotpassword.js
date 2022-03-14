const sgMail = require('@sendgrid/mail')
const dotenv = require('dotenv');
const User=require("../models/usersignup")
const uuid = require('uuid');
const Forgotpassword=require("../models/ForgotPasswordRequests")
const encript=require('bcryptjs');
const passwordchangetable=require("../models/usersignup")



dotenv.config();


exports.forgotpassword=(async (req,res)=>{
    // console.log("i am password forgot called")
    const email=req.body.email;
    
    const id=uuid.v4();
    await User.findAll({where:{email:email}}).then((user)=>{
 if(user){
    
       

    
    user[0].createForgotpassword({ id:id , isactive: true })
    .catch(err => {
        throw new Error(err)
    })
    
    sgMail.setApiKey(process.env.Send_Grid_Api)
    const msg = {
        to: email, // Change to your recipient
        from: 'yashwanthkrishna150@gmail.com', // Change to your verified sender
        subject: 'Link for Your Pasword changing @expenseTracker',
        text: 'Hie please find below link for your password changing',
        html: `<a href="http://localhost:3000/resetpassword/${id}>Reset password</a>`,
    }

    sgMail
    .send(msg)
    .then((response) => {
    // console.log(response[0].statusCode)
    // console.log(response[0].headers)
    console.log("sendmail successfully")
    return res.status(response[0].statusCode).json({message: 'Link to reset password sent to your mail ', sucess: true})

   })
   .catch((error) => {
     throw new Error(error);
  })
}
else{
    throw new Error('User doesnt exist')
}
})})

exports.resetpassword = (req, res) => {
    const id =  req.params.id;
    Forgotpassword.findOne({ where : { id }}).then(forgotpasswordrequest => {
        if(forgotpasswordrequest){
            forgotpasswordrequest.update({ isactive: false});
            res.status(200).send(`<html>
                                    <script>
                                        function formsubmitted(e){
                                            e.preventDefault();
                                            console.log('called')
                                        }
                                    </script>
                                    <form action="/updatepassword/${id}" method="get">
                                        <label for="newpassword">Enter New password</label>
                                        <input name="newpassword" type="password" required></input>
                                        <button>reset password</button>
                                    </form>
                                </html>`
                                )
            res.end()

        }
    })
}
exports.updatepassword=(async (req,res)=>{
    console.log(req.query,req.params,"i am the you are seaching for")
    const { newpassword } = req.query;
    const { resetpasswordid } = req.params;
    const hashpassword= await encript.hash(newpassword,10);
    Forgotpassword.findAll({where:{id:resetpasswordid}}).then((usertochange)=>{
        passwordchangetable.findAll({where:{id:usertochange[0].dataValues.UserId}}).then((us)=>{
            console.log(us)
            us[0].update({password: hashpassword}).then(()=>{
                res.sendStatus(200)
            })

        }).catch(err=>console.log(err))
        

    }).catch(err=>console.log(err))

})
