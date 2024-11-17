import express from "express"

import { addPartion, getPartions ,DeletePartion} from "../app/controllers/PartionController.js";

export const PartionRoutes = express.Router();



PartionRoutes.post('/add' , addPartion)
PartionRoutes.get('/all' , getPartions)
PartionRoutes.post('/delete' , DeletePartion)