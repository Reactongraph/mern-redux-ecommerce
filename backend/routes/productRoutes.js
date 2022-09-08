import express from "express"
const router = express.Router()
import {getProducts, getProductById } from '../controllers/productControllers.js'
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

router.route('/').get(getProducts)

router.route('/:id').get(getProductById)

export default router;
