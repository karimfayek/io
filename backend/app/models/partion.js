import mongoose from "mongoose";

const Schema = mongoose.Schema()

const PartionSchema = new mongoose.Schema({
    partionNumber: {type: Number , required:true},
    shelves: [{type: mongoose.Schema.Types.ObjectId , ref:'Shelf'} ]
})

export const Partion = mongoose.model('Partion' , PartionSchema)