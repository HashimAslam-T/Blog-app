const express = require('express');
const control = require('../controllers/authenticationController');
const router = express.Router();

router.post('/register',control.signUp);
router.post('/login',control.login);

module.exports = router;