import {z} from 'zod';
import getEventsModel  from '../models/eventsModel.js';
import express from 'express';

const router = express.Router();
const isAdmin = true;//we should authorize the user and if the user is admin then this should be true else false

const eventSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    images: z.array(z.string()).optional(),
    product_ids: z.array(z.number()).optional(),
    extras: z.array(z.string()).optional()
});

router.get("/",async (req,res)=>{
    const events = await getEventsModel();
    const all_events = await events.findAll();
    console.log(all_events);
    res.status(200).json(all_events);
});


router.get("/:id", async (req,res)=>{
    const {id} = req.params;
    const events = await getEventsModel();
    const selected_events = await events.findByPk(id);
    console.log(selected_events);
    res.status(200).json(selected_events);
});

router.post("/",async (req,res)=>{
    const values = req.body;
    if(isAdmin){
        try{
            const validate = eventSchema.parse(req.body);
            const events = await getEventsModel();
            events.create(values);
            res.status(201).json({msg:"event created successfully"});
        }
        catch(err){
            console.log(err.message);
        }
    }
});

router.put("/:id",async (req,res)=>{
    const values = req.body;
    const {id} = req.params;
    if(values == null || Object.keys(req.body).length ===0){
        return res.json({msg: "nothing to update"});
    }
    if(isAdmin){
        try{
            const validate = eventSchema.parse(req.body);
            const events = await getEventsModel();
            const selected_events = await events.findByPk(id);
            selected_events.update(values);
            res.status(200).json({msg:"updated"});  
        }
        catch(err){
            console.log(err.message);
            res.json({msg: "failed to update"});
        }
    }  
});

router.delete("/:id",async (req,res)=>{
    const {id} = req.params;
    const events = await getEventsModel();
    const event_delete = await events.findOne({where:{
        id: id
    }});
    if(event_delete==null){
        return res.json({msg:" event not found"});
    }
    try{
        
        event_delete.destroy();
        res.status(200).json({msg:"deleted"});
    }
    catch(err){
        console.log(err);
        res.json({msg: "failed to delete"});
    }
});

export default router;



