const fetch = require('node-fetch');
const dotenv = require('dotenv').config(); 
const { requestToken, requestUser } = require('./requestFunc');


const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const redirect_URL = 'https://github.com/login/oauth/authorize'

const githubController = {}

githubController.redirect = (req, res, err) => {
  res.redirect(`${redirect_URL}?client_id=${CLIENT_ID}`);
}

githubController.callback = (req, res, next) => {
  let { code } = req.query;
  requestToken(code).then((token) =>
    requestUser(token)
      .then(({ body }) => {
        res.locals.login = body.login;
        return next();
      })
      .catch((err) => {
        return next(err);
      })
  );
}


githubController.setCookie = (req, res, next) => {
  // const token = res.locals.token;
  res.cookie('token', 'iseeyou');
  next();
};

module.exports = githubController;