const jwt = require('jsonwebtoken')

const user=require("../models/usersignup")

require('dotenv').config()

exports.authenticate = async(req, res, next) => {
    try {
        const token = req.header('authorization')
        const userId = Number(jwt.verify(token, process.env.Tokensecrect))
       await user.findByPk(userId).then((user)=>{
            req.user =user
        next()
        }).catch(err=>console.log(err))
        
    }catch(err) {
        console.log(err)
        return res.status(404).json({message: 'from authentication', success: false})
    }
}