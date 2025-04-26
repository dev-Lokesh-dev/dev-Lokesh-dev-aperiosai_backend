import express from 'express';
import { getRetailers, getRetailerById, getWhatsappLink } from '../controllers/retailer.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(authenticate)
router.get('/', getRetailers);
router.get('/:id', getRetailerById);
router.get('/:id/whatsapp-link', getWhatsappLink);

export default router;
