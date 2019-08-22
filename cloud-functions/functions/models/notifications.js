const firebaseAdmin = require('../services/firebase')
const utils = require('../utils/utils')
const notificationsCollection = firebaseAdmin.firestore().collection('notifications')

const Notification = () => {
	return {
		id,
		toUserId,
		fromUserId,
		dismissed,
		message,
		createdAt: new Date().toISOString(),
	}
}

const notifications = {
	getAll: () => {
		return notificationsCollection.get()
			.then(data => utils.extractDocsFromSnapshot(data))
			.catch(err => { throw err });
	},

	getOne: notificationId => {
		if (!notificationId) throw Error("Notification Id required.")

		return notificationsCollection.get()
			.then(data => utils.extractDocsFromSnapshot(data)
				.filter(notifications => notificationId == notifications.id))
			.catch(err => { throw err });
	},

	add: notifications => {
		if (!notifications) throw Error("Notification is required.")
		return notificationsCollection.add(notifications, {merge: true})
	},

	// These two functions are dangerous because any valid user can delete/update any valid notifications id.
	// I need to add a check somewhere to check that the user has access to update a notifications.
	// I can add the check in the controller since I will have access to the user and notifications there.
	update: notifications => {
		if (!notifications.id) throw Error("Notification Id required.")
		return notificationsCollection.doc(notifications.id).set(notifications, {merge: true})
	},

	delete: notificationId => {
		if (!notifications) throw Error("Notification is required.")
		return notificationsCollection.doc(notifications.id).delete()
	}
}

module.exports = notifications, { Notification }
