const router = require('express').Router();
const comments = require('../models/comments');
const messages = require('../features/networkResponses/networkResponses')

router.get('/', async (req, res) => {
	try {
		let commentsData = await comments.getAll()
		res.json(messages.response200(commentsData))
	} catch (error) {
		console.log(error)
		res.status(400).json(messages.response400(error.message))
	}
});

router.post('/', async (req, res) => {
	try {
		const { body } = req
		let commentsData = await comments.add(body);
		res.json(messages.response201(body))
	} catch (error) {
		console.log(error)
		res.status(400).json(messages.response400(error.message))
	}
});

router.patch('/', async (req, res) => {
	try {
		const { body } = req
		let commentsData = await comments.add(body);
		res.json(messages.response201(body))
	} catch (error) {
		console.log(error)
		res.status(400).json(messages.response400(error.message))
	}
});

router.delete('/', async (req, res) => {
	try {
		const { id } = req.body
		let commentsData = await comments.delete(id);
		res.json(messages.response200(req.body))
	} catch (error) {
		console.log(error)
		res.status(400).json(messages.response400(error.message))
	}
});

module.exports = router;
