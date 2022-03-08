const express=require('express')
const app=express()
const bodyparser=require('body-parser')
const cors=require('cors')
const db=require('./utils/db')
const dotenv = require('dotenv');

app.use(cors());
dotenv.config();

const publicRoutes=require('./routes/public')

app.use(bodyparser.json())


const path = require('path')


app.use(publicRoutes)
app.use((req,res)=>{
    res.sendFile(path.join(__dirname,`Views/${req.url}`))
  
  })





db.sync().then(()=>{
    app.listen(3000)
})






