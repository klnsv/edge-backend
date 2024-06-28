
//this file is meant to be destroyed before completion incase it hasn't been destroyed, dw you can delete it :)

const {z, ZodString} = require('zod');
const express = require('express');

const app = express();
app.use(express.json());
products = [];
const ProductSchema = z.object({
    name: z.string().min(3).max(100),
    price: z.number().positive(),
    discount: z.number().positive(),
    quantity: z.number().positive(),
    descriptions: z.string().max(500),
    images: z.record(z.string()),
    parameters: z.record(z.string()),
    extras:z.record(z.string()),
    sale_id: z.number(),
    category_id: z.number(),
});

app.post('/Products', (req,res)=>{
    try{
        const validate = ProductSchema.parse(req.body);
        products.push(req.body);
        console.log(products);
        res.status(201).json({msg: 'Product created successfully'});
    }
    catch(err){
        res.status(400).json({error: err});
    }
});

app.listen(3000);
