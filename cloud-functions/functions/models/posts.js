const firebaseAdmin = require('../services/firebase')
const utils = require('../utils/utils')
const postsCollection = firebaseAdmin.firestore().collection('posts')

const posts = {
	getAll: () => {
		return postsCollection.get()
			.then(data => utils.extractDocsFromSnapshot(data))
			.catch(err => { throw err });
	},

	getOne: postId => {
		if (!postId) throw Error("Post Id required.")

		return postsCollection.get()
			.then(data => utils.extractDocsFromSnapshot(data)
				.filter(post => postId == post.id))
			.catch(err => { throw err });
	},

	update: post => {

	},

	delete: postId => {

	}
}

module.exports = posts
