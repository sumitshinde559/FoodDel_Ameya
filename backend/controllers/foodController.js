import foodModel from "../models/foodModel.js";
import fs from 'fs'
import { sampleFoods, sampleDescription } from "../config/sampleFoods.js";

// all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}

// add food
const addFood = async (req, res) => {

    let image_filename = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category:req.body.category,
        image: image_filename,
    })
    try {
        await food.save();
        res.json({ success: true, message: "Food Added" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// delete food
const removeFood = async (req, res) => {
    try {

        const food = await foodModel.findById(req.body.id);
        if (!/^(data:|https?:)/.test(food.image)) fs.unlink(`uploads/${food.image}`, () => { })

        await foodModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Food Removed" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}

// load the sample menu into an empty database
const seedFood = async (req, res) => {
    try {
        if (await foodModel.countDocuments() > 0) {
            return res.json({ success: false, message: "Menu already has items, nothing added" })
        }
        const frontend_url = process.env.FRONTEND_URL || "http://localhost:5173"
        await foodModel.insertMany(sampleFoods.map((food) => ({
            ...food,
            description: sampleDescription,
            image: `${frontend_url}/food/${food.image}`,
        })))
        res.json({ success: true, message: `Added ${sampleFoods.length} sample items` })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

export { listFood, addFood, removeFood, seedFood }