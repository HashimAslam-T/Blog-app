const {Post} = require('../sequelizeModels/blogPostModel');
const {Tag} = require('../sequelizeModels/tagModel');
const {BlogPostTag} = require('../sequelizeModels/postTagModel')


const blogPost = async (req, res) => {
  try {
    const user = req.user;

    const { title, body, tags } = req.body;

    const blogPost = await Post.create({
      title,
      body,
      userId: user.id,
    });

    const tagIds = [];

    if(!tags)
    {
      return res.status(201).json(blogPost);
    }
   
    if (tags.length!=0)
    {
      for (const tagText of tags) {
        let tag = await Tag.findOne({ where: { tagName: tagText } });
        if (!tag) {
          tag = await Tag.create({ tagName: tagText });
        }
        tagIds.push({BlogPostId:blogPost.id,TagId:tag.id});
      }
    
    await BlogPostTag.bulkCreate(tagIds);
    }

    res.status(201).json(blogPost);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Failed to create a blog post', error: error.message });
  }
};


const retrievePosts = async (req,res) =>
{
  try
  {
   const user = req.user;
   const userPosts = await Post.findAll({
    where:{
      userId: user.id
    }
   });
   res.send(userPosts);
  }
  catch(err)
  {
    res.status(500).res.send(err);

  }
}


const updatePost = async (req, res) => {
  try {
    const user = req.user;
    const { postId,title,body } = req.body;

    const postToUpdate = await Post.findOne({
      where: {
        id: postId,
        userId: user.id,
      },
    });

    if (!postToUpdate) {
      return res.status(404).json({ message: 'Blog post not found or unauthorized' });
    }

    await Post.update(
    {
      title,
      body
    },
    {
      where:
      {
       id:postId,
       userId:user.id
       
      }
    });

    res.json({ message: 'Blog post updated successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to update the blog post', error: error.message });
  }
};

const deletePost = async(req,res)=>
{
  try
  {  const user = req.user;

    const { postId } = req.body;

    const postToDelete = await Post.findOne({
      where: {
        id: postId,
        userId: user.id,
      },
    });

    if (!postToDelete) {
      return res.status(404).json({ message: 'Blog post not found or unauthorized' });
    }

    await Post.destroy(
    {
      where:
      {
       id:postId,
       userId:user.id
      }
    });

    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to update the blog post', error: error.message });
  }
};


module.exports = {blogPost,retrievePosts,updatePost,deletePost};
