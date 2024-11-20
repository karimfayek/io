import { Box } from "../models/box.js"
import { Shelf } from "../models/shelf.js"
import Joi from "joi"

const ShelfSchema = Joi.object(
    {
    number: Joi.string().required(),
    partion: Joi.string().required().length(24),
    boxes: Joi.string().length(24)
    }
)
export const getShelves = async (req, res) => {

    const shelves = await Shelf.find({}).populate('boxes' , 'serial').populate({
        path:'partion',
        select: 'partionNumber store',
        populate:{
            path:'store',
            select:'title'
        }
    })

    res.json(shelves)


}

export const DeleteShelf = async (req, res) => {
    
    const id = req.body.id;
    await Box.deleteMany({ shelf: id });
    const deletedShelf = await Shelf.findByIdAndDelete(id);

    if (!deletedShelf) {
       return res.status(404).json({ message: 'Shelf not found' });
    }
    
    res.json('deleted')


}

export const addShelf = async (req, res) => {
    try {
        const {error} = ShelfSchema.validate(req.body)
        if(error){
            return res.status(400).json({
                message: 'Invalid Input',
                details: error.details.map((detail)=> detail.message )
            })
        }
        const {number , partion} = req.body;
      
        // Check for existing Shelf with the same title
        const existingShelf = await Shelf.findOne({ number , partion });
        if (existingShelf) {
            return res.status(409).json({ message: 'Shelf with this number already exists' });
        }

        const newShelf = await Shelf.create({ number , partion });
        await newShelf.populate({
            path:'partion',
            select: 'partionNumber',
            populate:{
                path: 'store',
                select:'title'
            }
        })
        res.status(201).json(newShelf); // Send a success response

    } catch (error) {
        console.error('Error creating store:', error);

        // Handle MongoDB duplicate key error
        if (error.code === 11000) {
            res.status(409).json({ message: 'Store with this title already exists' });
        } 
        res.status(500).json({ message: 'Failed to create store', error: error.message });
    }
};