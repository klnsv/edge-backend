import {z} from 'zod';
import getCartModel from '../models/cartModel.js';
import getProductModel from '../models/productsModel.js';

import express from 'express';

const cartitemsArray = [];

const router = express.Router();

const cartSchema = z.object({
    user_id: z.number(),
    product_ids: z.object({product_id: z.number(), quantity: z.number()})
});

router.get("/:user_id", async (req,res)=>{
    try{
        const {user_id} = req.params; //later on it will be based on jwt and not on params
        const cart = await getCartModel(); 
        const product = await getProductModel();
        const user_cart = await cart.findOne({
            where:{
                user_id: parseInt(user_id)
            }
        });
          //gets the cart for that user
        const productIdsArray = user_cart.product_ids.map(order => order.product_id); //get the product_ids of that user
        
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
        
        const user_existing = await cart.findOne({
            where:{
                user_id: user_id
            }
        });
        console.log(user_existing);
        if(user_existing===null){
            cartitemsArray.push(product_ids);
            cart.create({user_id: parseInt(user_id), product_ids: cartitemsArray});
            res.status(200).json({msg: "Cart created and product added"});
        }
        else{
            cartitemsArray.push(product_ids);
            const cart_entry = await cart.findOne({where:{user_id: user_id}});
            cart_entry.update({user_id: parseInt(user_id), product_ids:cartitemsArray});
            res.status(200).json({msg:"Product added"})
        }
        
    }
    catch(err){
        res.json({msg: err});
    }
});

router.put("/:user_id", async (req,res)=>{
    const {user_id} = req.params;
    const {product_ids} = req.body;
    console.log(cartitemsArray)
    const cart = await getCartModel();
    for(var i =0;i<cartitemsArray.length;i++){
        if(cartitemsArray[i].product_id===product_ids.product_id){
            cartitemsArray[i].quantity = product_ids.quantity;
            const cart_entry = await cart.findOne({
                where:{
                    user_id: user_id
                }
            });
            cart_entry.update({product_ids: cartitemsArray});
            return res.status(200).json({msg:"Product updated successfully"});
        }
    }

    return res.status(200).json({msg:"Product not found,hence not updated"});
});

router.delete("/:user_id", async(req,res)=>{
    const {user_id} = req.params;
    const {product_ids}= req.body;
    const cart = await getCartModel();
    for(var i =0;i<cartitemsArray.length;i++){
        if(cartitemsArray[i].product_id===product_ids.product_id){
            cartitemsArray.splice(i,1);
            const cart_entry = await cart.findOne({
                where:{
                    user_id: user_id
                }
            });
            cart_entry.update({product_ids: cartitemsArray});
            return res.status(200).json({msg:"Product deleted and table updated successfully"});
        }
    }

    return res.status(200).json({msg: "Product not found, hence not deleted"});
});

export default router;

