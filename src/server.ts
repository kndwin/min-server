import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import "reflect-metadata"

import { db } from "./lib/connection"
import { Post, Users } from "./entity"

// express configs and set up
const app = express()
const port = process.env.PORT || 3001
dotenv.config()
if (process.env.NODE_ENV !== 'PROD') {
  app.use(morgan('combined'))
}
app.use(cors({ origin: "*" }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// routes
app.post('/createUser', async (req ,res ) => {
  const { name, source } = await req.body

  db().then(async connection => {
		// Save post 
		let userRepo = connection.getRepository( Users )
		let userFound = await userRepo.findOne({ name: name })
		if (userFound === undefined) {
			let userToCreate = new Users()
			userToCreate.name = name
			userToCreate.source = source
			await userRepo.save( userToCreate )
					.then(success => console.log(success))
					.catch(error => console.log(error))
			res.json({ message: `Username "${name}" is created`})
		} else {
			res.json({ message: 'Username already taken' })
		}
    connection.close()
  }).catch(error => {
		console.log(error)
		res.json({error: 'An error occured'})
	}) 
})


app.post('/createPost', async (req ,res ) => {
  const { title, markdown, user } = await req.body

  db().then(async connection => {
		// Check if connection is printing
    console.log(user)
    console.log(title)
    console.log(markdown)
		console.log(req.body)
		// Save post 
		let userRepo = await connection.getRepository( Users )
		let postRepo = await connection.getRepository( Post )
		let userFound = await userRepo.findOne({ name: user} )
    let post = new Post()
    post.title = title
    post.markdown = markdown
		post.user = userFound
		await postRepo.save(post)
		console.log(`Post is saved ${post}`)
		console.log(post)
    connection.close()
		res.json({ message:`Post is saved! ${post}`})
  }).catch(error => {
		console.log(error)
		res.json({error: 'An error occured'})
	}) 
})

// start server
app.listen(port, async () => {
	console.log(`Node is listening on port ${port}`)
})
