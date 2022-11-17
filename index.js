const express = require("express")
// const sequelize = require("sequelize")
const db = require('./models')
const categoryRouter = require("./routes/category")
const categoryRelationRouter = require('./routes/categoryRelation')
const app = express()
app.use(express.json())

app.use("/category", categoryRouter)
app.use("/category-relation", categoryRelationRouter)



db.sequelize.sync().then(()=>{
    app.listen(3000,()=>{
        console.log('connected to port 3000')
    })
})
.catch(err=>console.log(err.message))