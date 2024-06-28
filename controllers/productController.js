import {z} from 'zod';
import express from 'express';
import getProductModel from '../models/productsModel.js';


//const app = express();
//app.use(express.json());
let products = [];//it is mimicking the products table in database.
const isAdmin = true; //we should authorize the user and determine if that is admin or not


const ProductSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(3).max(100),
    price: z.number().positive(),
    discount: z.number().positive(),
    quantity: z.number().positive(),
    description: z.string().max(500),
    images: z.array(z.string()).nonempty(),
    parameters: z.array(z.record(z.string())),
    extras:z.record(z.string()),
    sale_id: z.number().optional(),
    category_id: z.number(),
});

const getProduct=async (req,res)=>{
    const product = await getProductModel();
    const display = await product.findAll();
    res.status(200).json(display);
};

const postProdById = async (req,res)=>{
    const product = await getProductModel();
    if(isAdmin){
        const {id} = req.params;
        try{
            req.body.id = parseInt(id);
            const validate = ProductSchema.parse(req.body);
            //const {parameters}=req.body;
            //console.log(parameters);
            const details = req.body;
            console.log(details);
            product.create(details).then(err => console.log(err));
            //products.push(req.body); //realistically, it should be pushing the data into db 
            //dw the id for products will be given automatically by MySQL
            //console.log(products[0].parameters);
            res.status(201).json({msg: 'Product created successfully'});
        }
        catch(err){
            console.log(err.message);
        }
    }
};

const getProdById= async (req,res)=>{
    const {id} = req.params;
    const product = await getProductModel();
    const selected_product = await product.findOne({
        where:{
            id: id
        }
    });
    res.status(200).json(selected_product);
};

const updateProducts= async (req,res)=>{
    const {id} = req.params;
    const product = await getProductModel();
    if(req.body == null || Object.keys(req.body).length === 0){
        return res.status(400).json({msg: "nothing to update"});
    }
    try{
        const selected_product = await product.findByPk(id);
        selected_product.update(req.body);
        res.status(200).json({msg: "product updated"});
    }
    catch(err){
        console.log(err);
        res.status(400).json({msg: "failed to update"});
    }
    
};

const deleteProducts = async (req,res)=>{
    const {id} = req.params;
    const product = await getProductModel();
    
    try{
        const selected_product = await product.findByPk(id);
        if(selected_product==null){
            return res.json({msg:"product not found"});
        }
        else{
            selected_product.destroy();
            res.status(200).json({msg:"deleted"});
        }
    }
    catch(err){
        console.log(err.message);
        res.status(400).json({msg:"failed to delete"});
    }
};

export default {getProduct,getProdById,postProdById,updateProducts,deleteProducts};
