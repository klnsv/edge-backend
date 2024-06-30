import {z} from 'zod';
import getCartModel from '../models/cartModel.js';
import getProductModel from '../models/productsModel.js';
import express from 'express';

const router = express.Router();

const cartSchema = z.object({
    user_id: z.number(),
    product_ids: z.array(z.object({product_id: z.number(), quantity: z.number()}))
});

router.get("/:user_id", async (req,res)=>{
    try{
        const {user_id} = req.params; //later on it will be based on jwt and not on params
        const cart = await getCartModel(); 
        const product = await getProductModel();
        const user_cart = await cart.findAll({
            where:{
                user_id: parseInt(user_id)
            }
        });
          //gets the cart for that user
        const productIdsArray = user_cart.map(order => order.product_ids[0].product_id); //get the product_ids of that user
        
        console.log(productIdsArray);
        
        const cartItems = await product.findAll({
            where:{
                id: productIdsArray
            }
        });   //get the items of the cart of that user from the product table
        res.status(200).json({cartItems,user_cart});
    }
    catch(err){
        console.log(err);
    }
});

router.post("/:user_id", async (req,res)=>{
    const {user_id}= req.params;
    console.log(user_id);
    const {product_ids} = req.body;
    console.log(product_ids);
    try{
        const validate = cartSchema.parse({user_id: parseInt(user_id),product_ids: product_ids});
        console.log(validate);
        const cart = await getCartModel();
        cart.create({user_id: parseInt(user_id), product_ids: product_ids});
        res.status(200).json({msg: "Product added to cart successfully"});
    }
    catch(err){
        res.json({msg: err});
    }
});


export default router;

