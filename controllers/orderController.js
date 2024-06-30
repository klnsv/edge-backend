import {z} from 'zod';
import getOrderModel from '../models/ordersModel.js';
import express from 'express';

const router = express.Router();

const orderSchema = z.object({
    order_id: z.string(),
    deliveryAddress: z.string(),
    amount_paid: z.number(),
    mode_of_transaction: z.string(),
    tracking_id: z.string(),
    ordered_time: z.date(),
    net_discount: z.number(),
    net_tax:z.number(),
    transaction_ids: z.array(z.number()),
    product_ids: z.array(z.number())
});



