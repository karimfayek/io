import mongoose from "mongoose"
import { Partion } from "../models/partion.js"

export const getPartions = async (req, res) => {

    const partions = await Partion.find({})

    res.json(partions)


}

export const DeletePartion = async (req, res) => {
    const id = req.body.id;
    const partions = await Store.findOneAndDelete({_id : id})

    res.json('deleted')


}

export const addPartion = async (req, res) => {
    try {
        const title = req.body.storeName;
        if (!title) {
            return res.status(400).json({ message: 'Store name is required' });
        }
        // Check for existing store with the same title
        const existingStore = await Store.findOne({ title });
        if (existingStore) {
            return res.status(409).json({ message: 'Store with this title already exists' });
        }

        const newStore = await Store.create({ title });
        res.status(201).json(newStore); // Send a success response

    } catch (error) {
        console.error('Error creating store:', error);

        res.status(500).json({ message: 'Failed to create store', error: error.message });
        // Handle MongoDB duplicate key error
        if (error.code === 11000) {
            res.status(409).json({ message: 'Store with this title already exists' });
        } else {
            res.status(500).json({ message: 'Failed to create store', error: error.message });
        }
    }
};