import { configDotenv } from "dotenv"
configDotenv()
import express from "express"
import connectDB from './config/connectDB.js'
import cors from "cors"



const app = express()

/////// midlleware /////////
app.use(cors({
    origin : 'http://localhost:3000'
}))

app.use(express.json())

app.use((req , res , next) => {
    console.log(req.path , req.method)
    next()
})

//// routes 
app.use('/' , )
/////// connectDB /////////
connectDB()

/////// start server  /////////
const PORT = process.env.PORT || 4000

app.listen(PORT , ()=> console.log(`server sarted at port: ${PORT}`))




