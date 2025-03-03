import express from 'express';
import { createDestination, deleteDestination, getAllDestinations, getDestinationById } from '../controllers/destinationController.js';

const router = express.Router();

router.post('/', createDestination);
router.get('/', getAllDestinations);
router.get('/:id', getDestinationById);
router.delete('/:id', deleteDestination);

export default router;