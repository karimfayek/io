import mongoose from "mongoose";

const BoxSchema = new mongoose.Schema({
    serial:{type:String , required: true},
    content: {type: String , required:false},
    shelf:{type: mongoose.Schema.Types.ObjectId , ref:'Shelf'}

})

export const Box = mongoose.model('Box' , BoxSchema)