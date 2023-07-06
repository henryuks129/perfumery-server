const express = require('express');
const router = express.Router();
const {register_controller, login_controller,logout_controller,loggedIn_conntroller} = require('../controller/userController');

// Register Route
router.post('/register', register_controller)

// Login Route
router.post('/login',login_controller)

// Logout Route
router.get('/logout',logout_controller)

// loggedIn
router.get('/loggedIn',loggedIn_conntroller)

module.exports = router