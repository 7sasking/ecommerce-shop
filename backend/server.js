import express from 'express'
import connectDB from './config/db.js'
import colors from 'colors'
import products from './data/products.js'
import dotenv from 'dotenv'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import {notFound,errorHandler} from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()

const app =express()

app.get(express.json())

app.get('/',(req,res)=>{
    res.send('API is running')
}
)


app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

app.use(notFound)

app.use(errorHandler)

const port = process.env.PORT

app.listen(port,console.log(`The server is running on Port ${process.env.PORT}`.yellow.bold))