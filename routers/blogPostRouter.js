const express = require('express');
const control = require('../controllers/blogPostController');
const router = express.Router();
const auth = require('../authenticate')

router.post('/blogPost',auth.authenticateToken,control.blogPost);
router.get('/retrievePosts',auth.authenticateToken,control.retrievePosts);
router.put('/updatePost',auth.authenticateToken,control.updatePost);
router.delete('/deletePost',auth.authenticateToken,control.deletePost);

module.exports = router;
