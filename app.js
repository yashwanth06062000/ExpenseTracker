const express=require('express')
const app=express()
const bodyparser=require('body-parser')
const cors=require('cors')
const db=require('./utils/db')

app.use(cors());

const publicRoutes=require('./routes/public')

app.use(bodyparser.json())

app.use(publicRoutes)
db.sync().then(()=>{
    app.listen(3000)
})






