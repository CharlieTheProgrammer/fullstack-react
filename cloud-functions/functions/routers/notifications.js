const router = require('express').Router();
const notifications = require('../models/notifications');
const messages = require('../features/networkResponses/networkResponses')

router.get('/', async (req, res) => {
	try {
		let notificationsData = await notifications.getAll()
		res.json(messages.response200(notificationsData))
	} catch (error) {
		console.log(error)
		res.status(400).json(messages.response400(error.message))
	}
});

router.post('/', async (req, res) => {
	try {
		const { body } = req
		let notificationsData = await notifications.add(body);
		res.json(messages.response201(body))
	} catch (error) {
		console.log(error)
		res.status(400).json(messages.response400(error.message))
	}
});

router.patch('/', async (req, res) => {
	try {
		const { body } = req
		let notificationsData = await notifications.add(body);
		res.json(messages.response201(body))
	} catch (error) {
		console.log(error)
		res.status(400).json(messages.response400(error.message))
	}
});

router.delete('/', async (req, res) => {
	try {
		const { id } = req.body
		let notificationsData = await notifications.delete(id);
		res.json(messages.response200(req.body))
	} catch (error) {
		console.log(error)
		res.status(400).json(messages.response400(error.message))
	}
});

module.exports = router;
