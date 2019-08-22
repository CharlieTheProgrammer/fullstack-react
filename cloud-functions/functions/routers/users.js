const router = require('express').Router();
const users = require('../models/users');
const messages = require('../features/networkResponses/networkResponses')

router.get('/', async (req, res) => {
	try {
		let usersData = await users.getAll()
		res.json(messages.response200(usersData))
	} catch (error) {
		console.log(error)
		res.status(400).json(messages.response400(error.message))
	}
});

router.post('/', async (req, res) => {
	try {
		const { body } = req
		let usersData = await users.add(body);
		res.json(messages.response201(body))
	} catch (error) {
		console.log(error)
		res.status(400).json(messages.response400(error.message))
	}
});

router.patch('/', async (req, res) => {
	try {
		const { body } = req
		let usersData = await users.add(body);
		res.json(messages.response201(body))
	} catch (error) {
		console.log(error)
		res.status(400).json(messages.response400(error.message))
	}
});

router.delete('/', async (req, res) => {
	try {
		const { id } = req.body
		let usersData = await users.delete(id);
		res.json(messages.response200(req.body))
	} catch (error) {
		console.log(error)
		res.status(400).json(messages.response400(error.message))
	}
});

module.exports = router;
