import mongoose from "mongoose";

const Schema = mongoose.Schema() ;

const BoxSchema = new mongoose.Schema({
    serial:{type:String , required: true}
})

export const Box = mongoose.model('Box' , BoxSchema)