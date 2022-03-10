const express=require('express')
const app=express()
const bodyparser=require('body-parser')
const cors=require('cors')
const db=require('./utils/db')
const dotenv = require('dotenv');
const jwt=require('jsonwebtoken');


const user=require("./models/usersignup")
const expenses=require("./models/expense")
const order=require("./models/orders")

const auth = require("./controllers/authorization")


app.use(cors());
dotenv.config();

const publicRoutes=require('./routes/public')
const expenseRoutes=require('./routes/expense')
const purchaseRoutes=require('./routes/purchase')

app.use(bodyparser.json())






user.hasMany(expenses);
expenses.belongsTo(user);

user.hasMany(order);
order.belongsTo(user);


app.use(publicRoutes)
app.use('*', auth.authenticate) 
app.use(purchaseRoutes)
app.use(expenseRoutes)




















db.sync().then(()=>{
    app.listen(3000)
})






