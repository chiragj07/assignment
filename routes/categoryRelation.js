const express = require("express")
const router = express.Router()
const {Op} = require("sequelize");
const { CategoryRelations} = require('../models')



// create


router.post('/create',async(req,res)=>{
    const data = req.body
    try{
        await CategoryRelations.create(data)
        res.status(200).json({status:"Success"})

    }
    catch(err){
        res.status(400).json({ status: "failed", message:err.message})

    }
    
})


// update

router.put('/update',async(req,res)=>{
    const data= req.body;
    try{
    const re = await CategoryRelations.update({RelationName: data.RelationName},{where: {[Op.and]:[{category1: data.category1},{category2:data.category2}]}})
    res.status(200).json({message:"success"})
    }
    catch(err){
        res.status(400).json({ status: "failed", message:err.message})
    }
})


// delete

router.put('/delete',async(req,res)=>{
    const data= req.body;
    try{
    const rowtoDelete = await CategoryRelations.findOne({where: {[Op.and]:[{category1: data.category1},{category2:data.category2}]}})
    rowtoDelete.destroy()
    res.status(200).json({status:"Success"})
    }
    catch(err){
        res.status(400).json({ status: "failed", message:err.message})

    }
})

module.exports= router