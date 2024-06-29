import {z} from 'zod';
import getCategoriesModel from '../models/categoriesModel.js';
import express from 'express';

const router = express.Router();
const idAdmin = true;

const categorySchema = z.object({
    name:z.string().optional(),
    product_ids: z.array(z.number()).optional(),
    description: z.string().optional(),
    images: z.array(z.string()).optional(),
    extras: z.any(z.string()).optional()
});

router.get('/',async (req,res)=>{
    const category = await getCategoriesModel();
    const all_category = await category.findAll();
    res.status(200).json(all_category);

});

router.get('/:id', async (req,res)=>{
    const category = await getCategoriesModel();
    const {id} = req.params;
    try{
        const selected_category = await category.findOne({where: {id:id}});
        console.log(selected_category);
        res.status(200).json(selected_category);
    }
    catch(err){
        console.log(err);
    }
});

router.post('/',async (req,res)=>{
    const category = await getCategoriesModel();
    const values = req.body;
    console.log(values);
    try{
        const validate = categorySchema.parse(values);
        category.create(values);
        res.status(201).json({msg:"Category create successfully"});
    }
    catch(err){
        console.log(err.message);
    }
})

router.put('/:id',async (req,res) =>{
    const {id} = req.params;
    const values = req.body;
    if(values == null || Object.keys(req.body).length ===0){
        return res.status(200).json({msg:"nothing to update"});
    }
    const category = await getCategoriesModel();
    try{
        const validate = categorySchema.parse(values);
        const selected_category = await category.findOne({where:{id:id}});
        selected_category.update(values);
        res.status(200).json({msg:"updated"});
    }
    catch(err){
        console.log(err);
        res.status(200).json({msg:"failed to update"});
    }

});

router.delete('/:id',async (req,res)=>{
    const {id} = req.params;
    const category = await getCategoriesModel();
    const toDelete = await category.findOne({where:{id:id}});
    if(toDelete == null){
        return res.status(200).json({msg:"category not found"});
    }
    try{
        toDelete.destroy();
        res.status(200).json({msg:"deleted"});
    }
    catch{
        res.status(200).json({msg:"failed to delete"});
    }

});

export default router;