const firebaseAdmin = require('../services/firebase')
const utils = require('../utils/utils')
const usersCollection = firebaseAdmin.firestore().collection('users')

const User = () => {
	return {
		id,
		email,
		bio,
		userHandle,
		userImage,
		createdAt: new Date().toISOString(),
	}
}

const users = {
	getAll: () => {
		return usersCollection.get()
			.then(data => utils.extractDocsFromSnapshot(data))
			.catch(err => { throw err });
	},

	getOne: userId => {
		if (!userId) throw Error("User Id required.")

		return usersCollection.get()
			.then(data => utils.extractDocsFromSnapshot(data)
				.filter(user => userId == user.id))
			.catch(err => { throw err });
	},

	add: user => {
		if (!user) throw Error("User is required.")
		return usersCollection.add(user, {merge: true})
	},

	// These two functions are dangerous because any valid user can delete/update any valid user id.
	// I need to add a check somewhere to check that the user has access to update a user.
	// I can add the check in the controller since I will have access to the user and user there.
	update: user => {
		if (!user.id) throw Error("User Id required.")
		return usersCollection.doc(user.id).set(user, {merge: true})
	},

	delete: userId => {
		if (!user) throw Error("User is required.")
		return usersCollection.doc(user.id).delete()
	}
}

module.exports = users, { User }
