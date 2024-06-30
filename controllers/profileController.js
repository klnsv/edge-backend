import {z} from 'zod';
import getAuthModel from '../models/usersModel.js';
import express from 'express';

const router = express.Router();
const profileSchema = z.object({
    userName : z.string().optional(),
    displayName: z.string().optional(),
    emailId: z.string().email().optional(),
    phoneNumber: z.number().optional(),
    deliveryAddress: z.object({
        state: z.string().optional(),
        district: z.string().optional(),
        city: z.string().optional(),
        pincode: z.string().optional(),
        address_lane: z.string().optional(),
        landmark: z.string().optional()
    }).optional()
});

router.get("/:user_id",async (req,res)=>{
    const {user_id} = req.params;
    const profile = await getAuthModel();
    const user = await profile.findByPk(user_id);
    res.status(200).json(user);
});

router.post("/", async (req,res)=>{
    const profile = await getAuthModel();
    const values = req.body;

    try{
        const validate = profileSchema.parse(values);
        profile.create(values);
        res.json({msg: "profile created!"});
    }
    catch(err){
        res.json(err.messsage);
    }
});

router.put("/:user_id", async (req,res)=>{
    const {user_id} = req.params;
    const profile = await getAuthModel();
    
    const update_values = req.body;
    
    if(update_values == null || Object.keys(req.body).length ===0){
        return res.status(200).json({msg:"nothing to update"});
    }
    try{
        const validate = profileSchema.parse(update_values);
        const user = await profile.findByPk(user_id);
        user.update(update_values);
        res.json({msg:"updated!"});
    }
    catch(err){
        console.log(err);
        req.json({msg:"failed to update!"});
    }
});

router.delete("/:user_id", async(req,res)=>{
    const {user_id} = req.params;
    const profile = await getAuthModel();
    try{
        const user = await profile.findByPk(user_id);
        try{
            user.destroy();
            res.json({msg: "deleted!"});
        }
        catch(err){
            res.json({msg:"failed to delete"});
        }
    }
    catch(err){
        res.json({msg: "user not found"});
    }
    

});

export default router;


