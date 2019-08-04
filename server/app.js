//https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0
//https://medium.com/@timtamimi/getting-started-with-authentication-in-node-js-with-passport-and-postgresql-2219664b568c

var util = require('util');
var express = require('express');
var app = express();
var passport = require("passport");

var fs = require('fs');
const { Pool, Client } = require('pg')
const bcrypt= require('bcrypt')
const uuidv4 = require('uuid/v4');
//TODO
//Add forgot password functionality
//Add email confirmation functionality
//Add edit account page


app.use(express.static('public'));

const LocalStrategy = require('passport-local').Strategy;
//const connectionString = process.env.DATABASE_URL;

var currentAccountsData = [];

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  // ssl: true
});

module.exports = function (app) {
  //
  // app.get('/join', function (req, res, next) {
  // 	res.render('join', {title: "Join", userData: req.user, messages: {danger: req.flash('danger'), warning: req.flash('warning'), success: req.flash('success')}});
  // });


  app.post('/join', async function (req, res) {

    try{
      const client = await pool.connect()
      await client.query('BEGIN')
      var hashedPassword = await bcrypt.hash(req.body.password, 5);

      await JSON.stringify(client.query('SELECT id FROM "users" WHERE "username"=$1', [req.body.username], function(err, result) {
        if(err) { console.log("SELECT ERROR", err); }
        let userExists = false;
        console.log(result)
        if(result){
          if(result.rows[0]){
            userExists = true;
            console.log("USER ALREADY EXISTS");
            // req.flash('warning', "This email address is already registered. <a href='/login'>Log in!</a>");
            // res.redirect('/join');
          }
        }
        if(!userExists) {
          client.query('INSERT INTO users (id, username, password) VALUES ($1, $2, $3)', [uuidv4(), req.body.username, hashedPassword], function(err, result) {
            if(err){console.log("INSERT ERROR",err);}
            else {

              client.query('COMMIT')
              console.log(result)
              // req.flash('success','User created.')
              // res.redirect('/login');
              return;
            }
          });

        }

      }));
      client.release();
    }
    catch(e){throw(e)}
  });

  // app.get('/account', function (req, res, next) {
  // 	if(req.isAuthenticated()){
  // 		res.render('account', {title: "Account", userData: req.user, userData: req.user, messages: {danger: req.flash('danger'), warning: req.flash('warning'), success: req.flash('success')}});
  // 	}
  // 	else{
  // 		res.redirect('/login');
  // 	}
  // });
  //
  // app.get('/login', function (req, res, next) {
  // 	if (req.isAuthenticated()) {
  // 		res.redirect('/account');
  // 	}
  // 	else{
  // 		res.render('login', {title: "Log in", userData: req.user, messages: {danger: req.flash('danger'), warning: req.flash('warning'), success: req.flash('success')}});
  // 	}
  //
  // });

  app.get('/logout', function(req, res){

    console.log(req.isAuthenticated());
    req.logout();
    console.log(req.isAuthenticated());
    // req.flash('success', "Logged out. See you soon!");
    // res.redirect('/');
  });

  app.post('/login',	passport.authenticate('local'), function(req, res) {
    if (req.body.remember) {
      req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
    }
    else {
      req.session.cookie.expires = false; // Cookie expires at end of session
    }
    // res.redirect('/');
  });



}

passport.use('local', new  LocalStrategy({passReqToCallback : true}, (req, username, password, done) => {

  loginAttempt();
  async function loginAttempt() {


    const client = await pool.connect()
    try{
      await client.query('BEGIN')
      var currentAccountsData = await JSON.stringify(client.query('SELECT id, "username", "password" FROM "users" WHERE "username"=$1', [username], function(err, result) {

        if(err) {
          return done(err)
        }
        if(result.rows[0] == null){
          // req.flash('danger', "Oops. Incorrect login details.");
          return done(null, false);
        }
        else{
          bcrypt.compare(password, result.rows[0].password, function(err, check) {
            if (err){
              console.log('Error while checking password');
              return done();
            }
            else if (check){
              return done(null, [{email: result.rows[0].email, firstName: result.rows[0].firstName}]);
            }
            else{
              // req.flash('danger', "Oops. Incorrect login details.");
              return done(null, false);
            }
          });
        }
      }))
    }

    catch(e){throw (e);}
  };

}
))




passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
