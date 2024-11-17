import mongoose from "mongoose";

const Schema = mongoose.Schema() ;

const ShelfSchema = new mongoose.Schema ({
    number: {type: Number , required : true},
    boxes:[{type : mongoose.Schema.Types.ObjectId , required : true }]
})

export const Shelf = mongoose.model('Shelf' , ShelfSchema)