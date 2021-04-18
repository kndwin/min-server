import { buildSchema } from 'graphql'

import { db } from './connection'
import { Post, Users } from "../entity"

// graphql
export var schema = buildSchema(`
	type User {
		name: String
		source: String
	}

	type Query {
		getUser(name: String!): User
	}												 

	type Mutation {
		createUser(name: String!, source: String!): User
	}
`)

export var root = {
	// check if user exist
	getUser: ({ name }) => {
		let ans = db().then(async connection => {
			let userRepo = connection.getRepository( Users )
			let userFound = await userRepo.findOne({ name: name })
			if (userFound !== undefined) {
				console.log(`User ${userFound.name} exist`)
				connection.close()
				let userJson = {
					name: userFound.name,
					source: userFound.source,
				}
				return userJson

			} else {
				console.log(`User ${userFound} doesn't exist`)
				connection.close()
				const nullUserJson = {
					name: null,
					source: null,
				}
				return nullUserJson
			}
		}).catch(error => {
			console.log(error)
			return error
		})
		return ans
	},
	createUser: ({ name, source }) => {
		let ans = db().then(async connection => {

			const userRepo = connection.getRepository( Users )
			const userFound = await userRepo.findOne({ name: name })

			if (userFound !== undefined) {
				console.log(`User ${userFound.name} exist`)
				connection.close()
				const nullUserJson = {
					name: null,
					source: null,
				}
				return nullUserJson

			} else {
				console.log(`User ${userFound} doesn't exist`)
				const newUser = {
					name: name,
					source: source,
				}
				await userRepo.save(newUser)
				connection.close()
				return newUser
			}
		}).catch(error => {
			console.error(error)
			return error
		})
		return ans
	}
}
