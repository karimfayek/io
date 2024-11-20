import express from "express"

import { addBox, getBoxes , DeleteBox} from "../app/controllers/boxController.js";

export const BoxRoutes = express.Router();



BoxRoutes.post('/add' , addBox)
BoxRoutes.get('/all' , getBoxes)
BoxRoutes.post('/delete' , DeleteBox)