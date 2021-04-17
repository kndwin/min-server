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
				return false
			}
		}).catch(error => {
			console.log(error)
			return error
		})
		return ans

	},
	
}
