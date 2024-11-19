import mongoose from "mongoose";

const PartionSchema = new mongoose.Schema({
    partionNumber: {type: Number , required:true},
    store:{type: mongoose.Schema.Types.ObjectId , ref:'Store' , required: true},
    shelves: [{type: mongoose.Schema.Types.ObjectId , ref:'Shelf'} ]
})

export const Partion = mongoose.model('Partion' , PartionSchema)