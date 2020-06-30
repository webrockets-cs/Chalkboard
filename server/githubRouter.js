const router = require('express').Router();
const { redirect, callback } = require('./controllers/githubController.js')

router.get('/user', redirect);

router.get('/callback', callback)

module.exports = router;