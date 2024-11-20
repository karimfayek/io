import mongoose from "mongoose";

const BoxSchema = new mongoose.Schema({
    serial:{type:String , required: true},
    content: {type: String },
    shelf:{type: mongoose.Schema.Types.ObjectId , ref:'Shelf' , required: true}

})

export const Box = mongoose.model('Box' , BoxSchema)