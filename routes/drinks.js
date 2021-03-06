var express = require('express');
var router = express.Router();

// link to the Drink model
var Drink = require('../models/drink');

// auth drink
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.redirect('/login');
    }
}

// GET main drinks page
router.get('/', isLoggedIn, function(req, res, next) {
    // use the Drink model to query the db for drink data
    Drink.find(function(err, drinks) {
       if (err) {
           console.log(err);
           res.render('error');
       }
        else {
           // load the drinks page and pass the query result
           res.render('drinks', {
               title: 'All the Booze That\'s Fit to Drink',
               drinks: drinks,
               user: req.user
           });
       }
    });
});

/* GET add-drink page. */
router.get('/add', isLoggedIn, isLoggedIn, function(req, res, next) {
    res.render('add-drink', {
        title: 'Add a New Drink',
        user: req.user
    });
});

//POST /drinks/add - proccess the form submission
router.post('/add', isLoggedIn, function(req, res, next) {
   //get the form inputs and use mongoose to insert to the db
    Drink.create( {
        name: req.body.name,
        drinkType: req.body.drinkType,
        size: req.body.size,
        units: req.body.units,
        alcoholPercentage: req.body.alcoholPercentage
    }, function(err, Drink) {
        if(err) {
            console.log(err);
            res.render('error', {message: 'Could not Add Drink'});
        }
        else {
            res.redirect('/drinks');
        }
    });
});

/* GET /drinks/delete/_id - proccesses delete  */
router.get('/delete/:_id', isLoggedIn, function(req, res, next) {
    //get the id from the url
    var _id = req.params._id;

    //delete the document with this _id
    Drink.remove( {_id: _id }, function(err) {
        if(err) {
            console.log(err);
            res.render('error', {
                message: 'Could not delete Drink',
                error: err
            });
        }
        else {
            res.redirect('/drinks');
        }
    });
});

/* GET /drinks/_id - display edit page & fill with values */
router.get('/:_id', isLoggedIn, function(req, res, next) {
    //get the id from the url
    var _id = req.params._id;

    //use mongoose to get the selected drink document
    Drink.findById( { _id: _id}, function(err, drink) {
       if(err) {
           console.log(err);
           res.render('error', {
               message: 'Could not load drink',
               error: err
           });
       }
       else {
           res.render("edit-drink", {
               title: 'Edit a Drink',
               drink: drink,
               user: req.user
           });
       }
    });
});

/* POST /drinks/_id - proccess form submission and update selected document */
router.post('/:_id', isLoggedIn, function(req, res, next) {
   //get id from url
    var _id = req.params._id;

    //instantiate and populate a new drink object
    var drink = new Drink( {
        _id: _id,
        name: req.body.name,
        drinkType: req.body.drinkType,
        size: req.body.size,
        units: req.body.units,
        alcoholPercentage: req.body.alcoholPercentage
    });

    //update the drink
    Drink.update({ _id: _id }, drink, function(err) {
        if (err) {
            console.log(err);
            res.render('error', {
                message: 'Could not Update Drink',
                error: err
            });
        }
        else {
            res.redirect('/drinks');
        }
    });
});

// make public
module.exports = router;
