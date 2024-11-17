import express from "express"

import { addStore, getStores ,DeleteStore} from "../app/controllers/storeController.js";

export const StoreRoutes = express.Router();



StoreRoutes.post('/add' , addStore)
StoreRoutes.get('/all' , getStores)
StoreRoutes.post('/delete' , DeleteStore)