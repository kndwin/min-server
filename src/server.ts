import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import "reflect-metadata"

import { db } from "./lib/connection"
import { Post } from "./entity"

// express configs and set up
const app = express()
const port = process.env.PORT || 3000
dotenv.config()
if (process.env.NODE_ENV !== 'PROD') {
  app.use(morgan('combined'))
}
app.use(cors({ origin: "*" }))
app.use(bodyParser.json())

// routes
app.get('/createPost', async (req, res) => {
  const { title, markdown, user } = req.query 
  db().then(connection => {
    console.log(user)
    console.log(title)
    console.log(markdown)
    let post = new Post()
    post.title = title

    connection.close()
  }).catch(error => console.log(error))

  res.send('Database did something I think')
})

// start server
app.listen(port, async () => {
	console.log(`Node is listening on port ${port}`)
})
