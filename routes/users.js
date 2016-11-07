var express = require('express');
var router = express.Router();

// link to the Account model
var Account = require('../models/account');

//check for authentication
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  }
  else {
    res.redirect('/login');
  }
}

// GET main users page
router.get('/', isLoggedIn, function(req, res, next) {
  // use the Account model to query the db for user data
  Account.find(function(err, accounts) {
    if (err) {
      console.log(err);
      res.render('error');
    }
    else {
      // load the drinks page and pass the query result
      res.render('users', {
        title: 'User Accounts',
        accounts: accounts,
        user: req.user
      });
    }
  });
});


module.exports = router;
