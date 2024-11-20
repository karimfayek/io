import { configDotenv } from "dotenv"
configDotenv()
import express from "express"
import connectDB from './config/connectDB.js'
import cors from "cors"
import { StoreRoutes } from "./routes/stores.js"
import { PartionRoutes } from "./routes/partions.js"
import {ShelfRoutes} from "./routes/shelf.js"
import {BoxRoutes} from "./routes/box.js"



const app = express()

/////// midlleware /////////

// global error handling ///
app.use((err, req , res , next)=> {
    console.error('Unhandled Error',err)
    res.status(500).json({message: 'Unhandeled Error Occured' , error:err.message })
})

//cors
app.use(cors({
    origin : 'http://localhost:3000'
}))

// json
app.use(express.json())

// log requests
app.use((req , res , next) => {
    console.log(req.path , req.method)
    next()
})

//// routes 
app.use('/store' , StoreRoutes)
app.use('/partion' , PartionRoutes)
app.use('/shelf' , ShelfRoutes)
app.use('/box' , BoxRoutes)

/////// connectDB /////////
connectDB()

/////// start server  /////////
const PORT = process.env.PORT || 4000

app.listen(PORT , ()=> console.log(`server sarted at port: ${PORT}`))




