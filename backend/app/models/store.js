import mongoose from "mongoose";

const StoreSchema = new mongoose.Schema({
   title: {
    type : String,
    required : true,
    unique: true
   },
   description: {
    type: String ,
    reqired :  false
   },
   partions:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Partion',
        required : false
    }
   ]
})

export const Store = mongoose.model('Store' , StoreSchema)