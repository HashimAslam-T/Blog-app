const express = require('express');
const control = require('../controllers/tagsController');
const router = express.Router();
const auth = require('../authenticate');

router.get('/getTags',auth.authenticateToken,control.getTags);
router.get('/search',auth.authenticateToken,control.search);

module.exports = router;