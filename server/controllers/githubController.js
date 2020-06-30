const fetch = require('node-fetch');
const dotenv = require('dotenv').config(); 

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const redirect_URL = 'https://github.com/login/oauth/authorize'

const githubController = {}

githubController.redirect = (req, res, err) => {
  res.redirect(`${redirect_URL}?client_id=${CLIENT_ID}`);
}

githubController.callback = (req, res, err) => {
  let { code } = req.query;
  if (!code) {
    return next({
      error: {message: 'Your are not authorized by Github!'}
    })
  }

  const requestToken = (codeInput) => {
    fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      header: {
          "Accept": 'application/json'
      },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: codeInput
      })
    })
  }

  requestToken(code)
    .then((result) => {
      
    })
  


}

module.exports = githubController;