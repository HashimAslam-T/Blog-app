const express = require('express');
const control = require('../controllers/commentsController');
const router = express.Router();
const auth = require('../authenticate')

router.post('/createComment',auth.authenticateToken,control.createComment);
router.get('/getComments',auth.authenticateToken,control.retrieveComments);

module.exports = router;
