const express = require('express');
const router = express.Router();
const PERFUMES = require('../model/perfumeryModel');
const controls = require('../controller/webController');


// CREATING
router.post('/create', async (req,res)=>{
    const perfumes = new PERFUMES({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        label: req.body.label,
        price: req.body.price,
        image: req.body.image,
    })
    try{
        // if(!title || !description || !category || !price || !image || !label) {
        //     res.status(404).json({err: "All input field must be filled"})
        // }
        // if(!title || !description || !category || !price || !image || !label) {
        //     return
        // }
        const savedPerfumes = await perfumes.save();
        res.status(200).json(savedPerfumes);
    } catch(err){
        res.status(404).json({message: err.message})
    }
})

// GETTING ALL PRODUCTS
router.get('/allproducts', async (req,res)=>{
    const allProducts = await PERFUMES.find();
    try{
        res.status(200).json(allProducts);
    } catch(err){
        res.status(404).json({message: err.message})
    }
})
// GETTING SINGLE PRODUCTS
router.get('/singleproducts/:productId', async (req,res)=>{
    try{
        const singleproducts = await PERFUMES.findById(req.params.productId);
        res.status(200).json(singleproducts);
    } catch(err){
        res.status(404).json({message: err.message})
    }
})

// DELETING PRODUCTS
router.delete('/deletedproducts/:productId', async (req,res)=>{
    try{
        const deletedProducts = await PERFUMES.findByIdAndDelete({_id: req.params.productId})
        res.status(200).json(deletedProducts);
    } catch(err){
        res.status(404).json({message: err.message})
    }
})

// UPDATING PRODUCTS
router.patch('/updateproducts/:productId', async (req,res)=>{
    try{
        const updatedProducts = await PERFUMES.findByIdAndUpdate({_id: req.params.productId}, {$set: req.body});
        res.status(200).json({updatedProducts});
    } catch(err){
        res.status(404).json({message: err.message})
    }
})

// CATEGORY 
router.get('/category/:category', async (req,res)=>{
    try{
        const categories = await PERFUMES.find({category: req.params.category});
        res.status(200).json(categories);
    } catch(err){
        res.status(404).json({message: err.message})
    }
})

module.exports = router;