const {Comments} = require('../sequelizeModels/commentsModel');
const {Post} = require('../sequelizeModels/blogPostModel');


const createComment = async (req, res) => {
    try {
      const user = req.user;
  
      const { comment, postId } = req.body;
  
      // Check if the blog post exists and is associated with the authenticated user
      const blogPost = await Post.findOne({
        where: {
          id: postId,
          UserId: user.id,
        },
      });
  
      if (!blogPost) {
        return res.status(404).json({ message: 'Blog post not found or unauthorized' });
      }
  
      const createComment = await Comments.create({
        comment,
        userId: user.id,
        postId,
      });
      res.status(201).json(createComment);
    } 
    catch (error) 
    {
      res.status(400).json({ message: 'Failed to create a comment', error: error.message });
    }
  };
  
  const retrieveComments = async (req, res) => {
    try {
      const {postId} = req.body;
  
      const blogPost = await Post.findOne({
        where: { id: postId },
      });
  
      if (!blogPost) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
  
      const comments = await Comments.findAll({
        where: { postId: postId },
      });
  
      res.json(comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to retrieve comments', error: error.message });
    }
  };


  module.exports = { createComment,retrieveComments};
