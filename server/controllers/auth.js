const passport = require('passport');
const validator = require('validator');
const User = require('../models/Users');

 exports.getLogin = (req, res) => {
    if (req.user) {
      return res.redirect('/')
    }
    console.log('WRONG LOGIN INFO')
    return res.send({message : 'wrong info'})
  }
  

  exports.postLogin = (req, res, next) => {
    const validationErrors = []
    
    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })
    console.log('password is blank');
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      console.log('validation error');
      return res.send({message : validationErrors})
    }
  
    passport.authenticate('local', (err, user, info) => {
      
      if (err) { return next(err) }
      
      if (!user) {
        console.log('no user');
        // req.flash('errors', info)
        return res.send({errors: info})
      }
      req.logIn(user, (err) => {
        console.log('loggin in');
        if (err) { return next(err) }
        console.log('sending user');
        console.log(user)
        // req.flash('success', { msg: 'Success! You are logged in.' })
        return res.send({user : user})
      })
    })(req, res, next)
  }
  
  exports.logout = (req, res) => {
    req.logout(() => {
      console.log('User has logged out.')
    })
    req.session.destroy((err) => {
      if (err) console.log('Error : Failed to destroy the session during logout.', err)
      req.user = null
      return res.send({logout : 'logout!'})
    })
  }
  
  exports.getSignup = (req, res) => {
    if (req.user) {
      return res.redirect('/')
    }
    res.send({message : 'sign up'})
  }
  
  exports.postSignup = (req, res, next) => {
    const validationErrors = []
    if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' })
    if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' })
  
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.send({message:validationErrors})
    }
  
    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password
    })
  
    User.findOne({$or: [
      {email: req.body.email},
      {userName: req.body.userName}
    ]}, (err, existingUser) => {
      if (err) { return next(err) }
      if (existingUser) {
        req.flash('errors', { msg: 'Account with that email address or username already exists.' })
        return res.send({message:'user already exists'})
      }
      user.save((err) => {
        if (err) { return next(err) }
        req.logIn(user, (err) => {
          if (err) {
            return next(err)
          }
          res.send({request : req.user})
          // res.redirect('/todos')
        })
      })
    })
  }