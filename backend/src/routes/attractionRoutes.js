import express from 'express';
import { getAllAttractions, getAttractionById, createAttraction } from '../controllers/attractionController.js';

const router = express.Router();

router.get('/', getAllAttractions);
router.get('/:id', getAttractionById);
router.post('/', createAttraction);

export default router;

