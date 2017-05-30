var express    = require('express'),
    jwt        = require('express-jwt'),
    config     = require('./config'),
    bodyParser = require('body-parser'),
    morgan     = require('morgan'),
    _           = require('lodash');

var router = module.exports = express.Router();
router.use(morgan('dev'));
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

var users = [];
//
// ROUTES FOR OUR API
// =============================================================================

// Validate access_token
var jwtCheck = jwt({
  secret: config.secret,
  audience: config.audience,
  issuer: config.issuer
});

// Check for scope
function requireScope(scope) {
  return function (req, res, next) {
    var has_scopes = req.user.scope === scope;
    if (!has_scopes) { 
        res.sendStatus(401); 
        return;
    }
    next();
  };
}

// middleware to use for all requests
router.use(function (req, res, next) {
    console.log('Icoming request');
    console.log(JSON.stringify(req.body));

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    res.setHeader("Access-Control-Allow-Methods" , "GET,POST,PUT,DELETE,OPTIONS");
    next();
});

var protectedRoutes = function(wss, users) {
    console.log('Protected Routes initialiazed !');
    this.wss = wss;
    this.users = users;
    return router;
};

module.exports = protectedRoutes;

/**
 *
 * Authentication
 * This will check all incoming request
 *
 */
router.use('/api', jwtCheck, requireScope('full_access'));

router.get('/api/user', function (req, res) {
    res.json(this.users);
});

router.delete('/api/user/:id', function (req, res) {
    var userId = req.params.id;
    console.log('Delete user: ' + userId);
    res.json(_.without(this.users, _.findWhere(this.users, { "username" : userId })));
});