import express from 'express';
import { getAllCities, getCityById, createCity } from '../controllers/cityController.js';

const router = express.Router();

router.get('/', getAllCities);
router.get('/:id', getCityById);
router.post('/', createCity);

export default router;

