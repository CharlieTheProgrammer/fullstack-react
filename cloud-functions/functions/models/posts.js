const firebaseAdmin = require('../services/firebase')
const utils = require('../utils/utils')
const postsCollection = firebaseAdmin.firestore().collection('posts')

const Post = () => {
	return {
		id,
		userId,
		content,
		userHandle,
		userImage,
		createdAt: new Date().toISOString(),
		commentCount,
		likeCount,
	}
}

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

	add: post => {
		if (!post) throw Error("Post is required.")
		return postsCollection.add(post, {merge: true})
	},

	// These two functions are dangerous because any valid user can delete/update any valid post id.
	// I need to add a check somewhere to check that the user has access to update a post.
	// I can add the check in the controller since I will have access to the user and post there.
	update: post => {
		if (!post.id) throw Error("Post Id required.")
		return postsCollection.doc(post.id).set(post, {merge: true})
	},

	delete: postId => {
		if (!post) throw Error("Post is required.")
		return postsCollection.doc(post.id).delete()
	}
}

module.exports = posts, { Post }
