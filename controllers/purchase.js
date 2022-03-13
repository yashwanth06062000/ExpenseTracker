const Razorpay=require('razorpay')
const jwt = require('jsonwebtoken')

const Order=require('../models/orders')
const usertable=require("../models/usersignup")
const ledb=require("../models/leaderboard")

const razorpay=new Razorpay({
    key_id:'rzp_test_CjoltYyX7FjsPn',
    key_secret:'KJQhZQa2V30Wo1GacCPKempw'
})
exports.buypremium=(req,res)=>{
    console.log("i am returning the order id from razor pay>>>>>>>>>")
    var details={
        amount: 25 * 100,
        currency: "INR",
    }
    razorpay.orders.create(details,(err,order)=>{
        if(err) {
            throw new Error(err);
        }
        req.user.createOrder({ orderid: order.id, status: 'PENDING'}).then(() => {
           
            return res.status(201).json({ order, key_id : razorpay.key_id});

        }).catch(err => {
            throw new Error(err)
        })
    })
} 
exports.updatetransactionstatus=(req,res)=>{
    try {
        const { payment_id, order_id} = req.body;
        Order.findOne({where : {orderid : order_id}}).then(order => {
            order.update({ paymentid: payment_id, status: 'SUCCESSFUL'}).then(() => {
                req.user.update({ispremiumuser: true})
                return res.status(202).json({sucess: true, message: "Transaction Successful"});
            }).catch((err)=> {
                throw new Error(err);
            })
        }).catch(err => {
            throw new Error(err);
        })
    } catch (err) {
        console.log(err);
        res.status(403).json({ errpr: err, message: 'Sometghing went wrong' })

    }

}
exports.is_premium=(req,res)=>
{
        if(req.user.ispremiumuser)
        {
            res.json({ispremium:true})
        }
}

exports.leaderboard=(req,res)=>
{
    ledb.findAll({order: [
        ['totalexpense', 'DESC']
    ]}).then((users)=>{

        res.json({users})

      

    }).catch(err=>console.log(err))




}



