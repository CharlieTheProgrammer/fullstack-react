const router = require('express').Router();
const posts = require('../models/posts');
const messages = require('../features/networkResponses/networkResponses')

router.get('/', async (req, res) => {
	try {
		let postsData = await posts.getAll()
		res.json(messages.response200(postsData))
	} catch (error) {
		console.log(error)
		res.status(400).json(messages.response400(error.message))
	}
});

router.post('/', (req, res) => {

});

router.patch('/', (req, res) => {

});

router.delete('/', (req, res) => {

});

module.exports = router;
