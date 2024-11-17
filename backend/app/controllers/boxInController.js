import { Box } from "../models/box.js";
import { Partion } from "../models/partion.js";
import { Store } from "../models/store.js";


async function getBoxes(req, res) {

    try {
        const boxes = await Box.find();
        res.json(boxes) 

    }
    catch(error){
        console.log(error)
    }
  
}

async function getBox(req, res) {

    try {
        const box = Box.find(req.params.id)
        res.json(box)

    } catch (error) {
        console.log(error)
    }
}

async function storeBox(req, res) {
   
    try {
        const {partion , serial , shelf} = req.body 

        const newBox = await Box.createOne({serial})
        try {
            const findpartion = await Partion.find({partion})


        }catch (error){

        }
    }
    catch (error) {
        console.log(error)
    }
}

async function addPartion(number , shelves) {
    const partion = Partion.create({partionNumber:number} )
   
    console.log('created' , partion)
}

//addPartion(1)

export  {addPartion , storeBox}