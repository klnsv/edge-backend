import {z} from 'zod';
import express from 'express';
import getProductModel from '../models/productsModel.js';

const router = express.Router();
var wishlist = [];

const wishSchema = z.object({
    product_id: z.number(),
    quantity: z.number()
});

router.get("/", async (req,res)=>{
    const products = await getProductModel();
    const {wishList} = req.cookies;
    var queried = [];
    //for(var i =0;i<values.length;i++){
    //    const entry = await products.findByPk(values[i].product_id);
    //    queried.push(entry);
    //}
    res.json(wishList); //wishList should be replace by queried on the time of production
});

router.post("/", (req,res)=>{
    try{
        const validate = wishSchema.parse(req.body);
        wishlist.push(req.body);
        res.cookie("wishList", wishlist,{maxAge: 604800000}).send({msg:"Product added to wishlist successfully"});
    }
    catch(err){
        console.log(err.message);
    }
});

router.delete("/:id", (req,res)=>{
    const {id} = req.params;
    console.log(id);
    const index = wishlist.findIndex((item) => item.product_id === parseInt(id));
    console.log(wishlist);
    console.log(index)
    if (index !== -1) {
        // Remove the item from the wishlist
        wishlist.splice(index, 1);
        res.cookie("wishList", wishlist);
        console.log(wishlist);
        return res.json({ msg: "Item deleted successfully!" });
    }
    else{
        return res.json({msg:" product not found"});
    }
});

router.put("/:id", (req,res)=>{
    const {id} = req.params;
    const {quantity} = req.body;
    console.log(id);
    const index = wishlist.findIndex((item) => item.product_id === parseInt(id));
    console.log(wishlist);
    console.log(index)
    if (index !== -1) {
        // Remove the item from the wishlist
        wishlist[index].quantity=quantity;
        res.cookie("wishList", wishlist);
        console.log(wishlist);
        return res.json({ msg: "Item updated successfully!"});
    }
    else{
        return res.json({ msg: "product not found"});
    }
});

export default router;