import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import todoRouter from './apis/todo-api.js'
dotenv.config('.env')



const app = express()
app.use(cors())
app.use(express.json())

app.use(express.static('public'))



app.use('/',todoRouter)

app.use('/', (req, res) => {
    res.send("Server running")
})

app.listen(process.env.PORT, () => {
    console.log(`Server Started..${process.env.APPLICATION_NAME}`)
    console.log(`Now listening on ${process.env.PORT}`)
})
