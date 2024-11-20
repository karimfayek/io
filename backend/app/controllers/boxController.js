import { populate } from "dotenv"
import { Box } from "../models/box.js"
import { Shelf } from "../models/shelf.js"
import Joi from "joi"

const BoxSchema = Joi.object(
    {
    serial: Joi.string().required(),
    shelf: Joi.string().required().length(24),
    content: Joi.string().length(24)
    }
)
export const getBoxes = async (req, res) => {

    const boxes = await Box.find({}).populate('shelf' , 'number').populate({
        path:'shelf',
        select: 'number',
        populate:{            
            path:'partion',
            select: 'partionNumber store',
            populate:{

            path:'store',
            select:'title'
            }
           
        }
    })

    res.json(boxes)


}

export const DeleteBox = async (req, res) => {
    
    const id = req.body.id;
    const deletedBox = await Box.findByIdAndDelete(id);

    if (!deletedBox) {
       return res.status(404).json({ message: 'Box not found' });
    }
    
    res.json('deleted')


}

export const addBox = async (req, res) => {
    try {
        const {error} = BoxSchema.validate(req.body)
        if(error){
            return res.status(400).json({
                message: 'Invalid Input',
                details: error.details.map((detail)=> detail.message )
            })
        }
        const {serial , shelf , content} = req.body;
      
        // Check for existing Box with the same title
        const existingBox = await Box.findOne({ serial , shelf });
        if (existingBox) {
            return res.status(409).json({ message: 'Box with this number already exists' });
        }

        const newBox = await Box.create({ serial , shelf , content});
        await newBox.populate({
            path:'shelf',
            select: 'number',
            populate:{
            path:'partion',
            select: 'partionNumber',
            populate:{
                path: 'store',
                select:'title'
            }
            }
        })
        res.status(201).json(newBox); // Send a success response

    } catch (error) {
        console.error('Error creating store:', error);

        // Handle MongoDB duplicate key error
        if (error.code === 11000) {
            res.status(409).json({ message: 'Store with this title already exists' });
        } 
        res.status(500).json({ message: 'Failed to create store', error: error.message });
    }
};