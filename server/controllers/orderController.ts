import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import Order from '../models/Order';

export const addOrderItems = async (req: AuthRequest, res: Response) => {
    const { orderItems, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400).json({ message: 'No order items' });
        return;
    } else {
        const order = new Order({
            user: req.user._id,
            orderItems,
            totalPrice
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
};

export const getMyOrders = async (req: AuthRequest, res: Response) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
};
