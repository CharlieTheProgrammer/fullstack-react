const firebaseAdmin = require('../services/firebase')
const utils = require('../utils/utils')
const commentsCollection = firebaseAdmin.firestore().collection('comments')

const Comment = () => {
	return {
		id,
		userId,
		postId,
		comment,
		createdAt: new Date().toISOString(),
	}
}

const comments = {
	getAll: () => {
		return commentsCollection.get()
			.then(data => utils.extractDocsFromSnapshot(data))
			.catch(err => { throw err });
	},

	getOne: commentId => {
		if (!commentId) throw Error("Comment Id required.")

		return commentsCollection.get()
			.then(data => utils.extractDocsFromSnapshot(data)
				.filter(comment => commentId == comment.id))
			.catch(err => { throw err });
	},

	add: comment => {
		if (!comment) throw Error("Comment is required.")
		return commentsCollection.add(comment, {merge: true})
	},

	// These two functions are dangerous because any valid user can delete/update any valid comment id.
	// I need to add a check somewhere to check that the user has access to update a comment.
	// I can add the check in the controller since I will have access to the user and comment there.
	update: comment => {
		if (!comment.id) throw Error("Comment Id required.")
		return commentsCollection.doc(comment.id).set(comment, {merge: true})
	},

	delete: commentId => {
		if (!comment) throw Error("Comment is required.")
		return commentsCollection.doc(comment.id).delete()
	}
}

module.exports = comments, { Comment }
