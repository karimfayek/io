import mongoose from "mongoose"
import { Partion } from "../models/partion.js"
import { Store } from "../models/store.js"
import Joi from "joi"

const partionSchema = Joi.object({
    partionNumber: Joi.number().required().min(1),
    store: Joi.string().required().length(24)
})

export const getPartions = async (req, res) => {

    const partions = await Partion.find({}).populate('store', 'title')

    res.json(partions)


}

export const DeletePartion = async (req, res) => {

    const id = req.body.id;

    const partion = await Partion.findById(id)

    if (!partion) {
        return res.status(404).json('Partion Not Found')
    }
    //delete the partion from the store 
    const store = await Store.findByIdAndUpdate(partion.store, {
        $pull: { partions: id }
    })
    //delete partion 
    const delPartion = await Partion.findOneAndDelete({ _id: id })

    res.json('deleted')


}

export const addPartion = async (req, res) => {
    try {
        const { error } = partionSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                message: 'Invalid input',
                details: error.details.map((detail) => detail.message),
            });
        }
        const { partionNumber, store } = req.body;
        if (!partionNumber || !store) {
            return res.status(400).json({ message: 'Partion Number and store  is required' });
        }
        // Check for existing store with the same title
        const existingPartion = await Partion.findOne({ partionNumber: partionNumber, store: store });
        if (existingPartion) {
            return res.status(409).json({ message: 'Partion already exists' });
        }
        //create the new partion
        const newPartion = await Partion.create({ partionNumber, store });

        await newPartion.populate('store', 'title');
        // then update the store it belongs to 
        const updatedStore = await Store.findByIdAndUpdate(store,
            { $push: { partions: newPartion._id } },
            { new: true }
        )
        if (!updatedStore) {
            return res.status(404).json({ message: 'Store not found' });
        }
        console.log('new partion created',newPartion)
        res.status(201).json(newPartion); // Send a success response

    } catch (error) {
        console.error('Error creating new Partion:', error);

        res.status(500).json({ message: 'Failed to create Partion', error: error.message });
        // Handle MongoDB duplicate key error
        if (error.code === 11000) {
            res.status(409).json({ message: 'Partion with this title already exists' });
        } else {
            res.status(500).json({ message: 'Failed to create Partion', error: error.message });
        }
    }
};