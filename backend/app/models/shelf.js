import mongoose from "mongoose";

const Schema = mongoose.Schema() ;

const ShelfSchema = new mongoose.Schema ({
    number: {type: Number , required : true},
    partion: {type: mongoose.Schema.Types.ObjectId , ref:'Partion'},
    boxes:[{type : mongoose.Schema.Types.ObjectId }]
})

export const Shelf = mongoose.model('Shelf' , ShelfSchema)