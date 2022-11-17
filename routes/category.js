const express = require("express")
const {Op} = require("sequelize");
const router = express.Router()
const {Category, CategoryRelations, sequelize} = require('../models')





// to create category

router.post('/create',async(req,res)=>{
    const data = req.body;
    try{
    await Category.create({Name: data.Name, id:data.id})
    res.status(200).json({status:"Success"})
    }
    catch(err){
        res.status(400).json({ status: "failed", message:err.message})
    
    }
    
})

// To update the category 

router.put('/:id/update',async(req,res)=>{
    const data= req.body;
    const id = parseInt(req.params.id);
    console.log(id)
    try{
    
    const re = await Category.update(data,{where: {id:id}})
    res.status(200).json({status:"success", message:re})
    }
    catch(err){        
        res.status(400).json({ status: "failed", message:err.message})

    }
})


// To delete the category and category relation associated with it

router.delete('/:id/delete', async(req,res)=>{
    console.log(req.params.id)
    const q = parseInt(req.params.id)
    try{    
            const cat = await Category.findOne({where:{id: q}})
            await cat.destroy()
           const cat2= await CategoryRelations.findAll({where:{[Op.or]:[{category1: q}, {category2: q}]}})
            res.status(200).json({status:"success"})
    }
    catch(err){
        res.status(400).json({ status: "failed", message:err.message})

    }

})


// paginated list of categories

router.get('/list', async(req,res)=>{
    let {page, limit} = req.query
    page = (page && parseInt(page))|| 0;
    limit= (limit && parseInt(limit)) || 5;
    try{
    
        const categories = await Category.findAll({limit:limit, offset:(page-1)*limit})
        res.status(200).json({status:"Success",data:categories})
    }catch{

        res.status(400).json({message:err.message,status:"failed"})

    }
})


// REST end point for given a category id

router.get('/:id/category-details',async(req,res)=>{
        const id = parseInt(req.params.id);
        try{

        const [success,results] = await sequelize.query(
            `SELECT cr.category1, cr.category2, c.Name as Name1, c2.Name as Name2, cr.RelationName from CategoryRelations cr
             LEFT JOIN Categories c ON cr.category1=c.id 
             LEFT JOIN Categories c2 ON cr.category2=c2.id
             where c2.id=${id} or c.id=${id}
             `
        );
        let responseResult={}
        if(results.length){
            responseResult ={
                id: id,
                Name: results[0].category1 === id ? results[0].Name1 : results[0].Name2,
                references: results.map(item=>{
                    let ref_details , relationName;
                    ref_details = item.category1 === id ? { ref_id: item.category2, ref_name: item.Name2}: {ref_id:item.category1 ,ref_name:item.Name1}
                    relationName = item.RelationName
                    return {...ref_details, relationName}
                })
            }
        }
        
        res.status(200).json({status:"success", data:responseResult})
         
    }
        catch(err){
            res.status(400).json({message:err.message,status:"failed"})
        }
})




module.exports= router