import mongoose from "mongoose"
import { Store } from "../models/store.js"
import { Partion } from "../models/partion.js"
import Joi from "joi"

const StoreSchema = Joi.object(
    {
    storeName: Joi.string().required(),
    description: Joi.string(),
    partions: Joi.string().length(24)
    }
)
export const getStores = async (req, res) => {

    const stores = await Store.find({}).populate('partions' , 'partionNumber')

    res.json(stores)


}

export const DeleteStore = async (req, res) => {
    const id = req.body.id;
    await Partion.deleteMany({ store: id });
    const deletedStore = await Store.findByIdAndDelete(id);

    if (!deletedStore) {
       return res.status(404).json({ message: 'Store not found' });
    }
    
    res.json('deleted')


}

export const addStore = async (req, res) => {
    try {
        const {error} = StoreSchema.validate(req.body)
        if(error){
            return res.status(400).json({
                message: 'Invalid Input',
                details: error.details.map((detail)=> detail.message )
            })
        }
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

        // Handle MongoDB duplicate key error
        if (error.code === 11000) {
            res.status(409).json({ message: 'Store with this title already exists' });
        } 
        res.status(500).json({ message: 'Failed to create store', error: error.message });
    }
};