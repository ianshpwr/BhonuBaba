import express from 'express';
import { addOrderItems, getMyOrders } from '../controllers/orderController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', protect, addOrderItems);
router.get('/myorders', protect, getMyOrders);

export default router;
