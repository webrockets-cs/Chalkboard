const router = require('express').Router();
const { redirect, callback, setCookie } = require('./controllers/githubController.js')

router.get('/user', redirect);

router.get('/callback', callback, setCookie, (req, res) => {
  res.status(200).redirect('http://localhost:8080/canvas');
})

module.exports = router;