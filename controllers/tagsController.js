const {Tag} = require('../sequelizeModels/tagModel');
const {BlogPostTag} = require('../sequelizeModels/postTagModel');
const {Post} = require('../sequelizeModels/blogPostModel')

const getTags = async(req,res)=>
{
 try
 {
   const {postId} = req.body;
   const findId = await BlogPostTag.findAll({
    where:{BlogPostId:postId}
   })

   const tagIds = [];
   for (ids of findId){
    tagIds.push(ids.dataValues.TagId)
   }
//    console.log(tagIds);

   const findTags = await Tag.findAll({
    where:{id:tagIds}
   })
//    const tagNames = [];
//    for(ids of findTags)
//    {
//      tagNames.push(ids.dataValues.tagName);
//    }

//    console.log(tagNames)
   res.status(200).send(findTags)
  }
 catch(err)
 {
  console.log(err)
  res.status(500).send('Could not get tags')
 }
}

const search = async (req,res)=>
{
try
{
 const{title,tags} = req.body;
 const titlePosts = await Post.findAll({
    where:{title:title}
 });

if (tags.length!==0)
{
     const findId = await Tag.findAll({
      where:{tagName:tags},
      attributes:['id']
     });
     const tagIds = findId.map(tag => tag.dataValues.id);
   console.log(tagIds);
   
     const findPostId = await BlogPostTag.findAll({
      where:{TagId:tagIds},
      attributes:['BlogPostId']
     });
   //   console.log(findPostId);
     const postId = findPostId.map(post=>post.dataValues.BlogPostId);
     console.log(postId);

     const findPost = await Post.findAll({where:{id:postId}});
     const result = [titlePosts,findPost]
      res.status(200).send(result);

   }
else{res.status(200).send(titlePosts)}
 
}
catch(err)
{
    console.log(err)
    res.status(500).send('Could not get titles');
}
}

module.exports = {getTags,search};
