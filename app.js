const express=require('express')
const app=express()
const bodyparser=require('body-parser')
const cors=require('cors')
const db=require('./utils/db')
const dotenv = require('dotenv');
const jwt=require('jsonwebtoken');


const user=require("./models/usersignup")
const expenses=require("./models/expense")
const auth = require("./controllers/authorization")


app.use(cors());
dotenv.config();

const publicRoutes=require('./routes/public')
const expenseRoutes=require('./routes/expense')

app.use(bodyparser.json())


const path = require('path')
user.hasMany(expenses);
expenses.belongsTo(user);


app.use(publicRoutes)
app.use('*', auth.authenticate) 
app.use(expenseRoutes)




















db.sync().then(()=>{
    app.listen(3000)
})






