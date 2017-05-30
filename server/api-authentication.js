var express     = require('express'),
    _           = require('lodash'),
    config      = require('./config'),
    jwt         = require('jsonwebtoken'),
    bodyParser  = require('body-parser'),
    morgan      = require('morgan'),
    users       = require('./users');

var app = module.exports = express.Router();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

function createIdToken(user) {
  return jwt.sign(_.omit(user, 'password'), config.secret, { expiresIn: 60*60*5 });
}

function createAccessToken(user) {
  return jwt.sign({
    iss: config.issuer,
    aud: config.audience,
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    scope: 'full_access',
    sub: "user_profile|pictures",
    jti: genJti(), // unique identifier for the token
    alg: 'HS256'
  }, config.secret);
}

// Generate Unique Identifier for the access token
function genJti() {
  var jti = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < 16; i++) {
      jti += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  
  return jti;
}

function getUserScheme(req) {
  
  var username;
  var type;
  var userSearch = {};

  // The POST contains a username and not an email
  if(req.body.username) {
    username = req.body.username;
    type = 'username';
    userSearch = { username: username };
  }
  // The POST contains an email and not an username
  else if(req.body.email) {
    username = req.body.email;
    type = 'email';
    userSearch = { email: username };
  }

  return {
    username: username,
    type: type,
    userSearch: userSearch
  }
}

app.route('/user/auth').post(function (req, res) {

    var userScheme = getUserScheme(req);

    if (!req.body.username || !req.body.password) {
        return res.status(400).send("You must send the username and the password");
    }
    var user = _.find(users, userScheme.userSearch);

    if (!user) {
        return res.status(401).send("The username or password don't match");
    }

    if (user.password !== req.body.password) {
        return res.status(401).send("The username or password don't match");
    }

    res.status(201).send({
        id_token: createIdToken(user),
        access_token: createAccessToken(user)
    });
});