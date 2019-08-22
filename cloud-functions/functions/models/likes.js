const firebaseAdmin = require('../services/firebase')
const utils = require('../utils/utils')
const likesCollection = firebaseAdmin.firestore().collection('likes')

const Like = () => {
	return {
		id,
		userId,
		postId,
		createdAt: new Date().toISOString(),
	}
}

const likes = {
	getAll: () => {
		return likesCollection.get()
			.then(data => utils.extractDocsFromSnapshot(data))
			.catch(err => { throw err });
	},

	getOne: likeId => {
		if (!likeId) throw Error("Like Id required.")

		return likesCollection.get()
			.then(data => utils.extractDocsFromSnapshot(data)
				.filter(like => likeId == like.id))
			.catch(err => { throw err });
	},

	add: like => {
		if (!like) throw Error("Like is required.")
		return likesCollection.add(like, {merge: true})
	},

	// These two functions are dangerous because any valid user can delete/update any valid like id.
	// I need to add a check somewhere to check that the user has access to update a like.
	// I can add the check in the controller since I will have access to the user and like there.
	update: like => {
		if (!like.id) throw Error("Like Id required.")
		return likesCollection.doc(like.id).set(like, {merge: true})
	},

	delete: likeId => {
		if (!like) throw Error("Like is required.")
		return likesCollection.doc(like.id).delete()
	}
}

module.exports = likes, { Like }
