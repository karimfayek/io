import mongoose from "mongoose";

const Schema = mongoose.Schema()

const StoreSchema = new Schema({
   title: {
    type : String,
    required : true
   },
   description: {
    type: string ,
    reqired :  false
   },
   partionsCount:{
    type : Number,
    required : false ,
   },
   partions:[
    {
        type: mongoose.Schema.Types.ObjectId,
        required : true
    }
   ]
})