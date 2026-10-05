import express from 'express';
import { addFood, listFood, removeFood, seedFood } from '../controllers/foodController.js';
import multer from 'multer';
const foodRouter = express.Router();

//Image Storage Engine (kept in memory, saved to MongoDB by addFood)

const upload = multer({ storage: multer.memoryStorage() })

foodRouter.get("/list",listFood);
foodRouter.post("/add",upload.single('image'),addFood);
foodRouter.post("/remove",removeFood);
foodRouter.get("/seed",seedFood);

export default foodRouter;