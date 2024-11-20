import express from "express"

import { addShelf, getShelves , DeleteShelf} from "../app/controllers/shelfController.js";

export const ShelfRoutes = express.Router();



ShelfRoutes.post('/add' , addShelf)
ShelfRoutes.get('/all' , getShelves)
ShelfRoutes.post('/delete' , DeleteShelf)