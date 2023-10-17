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
 const{title} = req.body;
 const titlePosts = await Post.findAll({
    where:{title:title}
 });
//  console.log(titlePosts);

 res.status(200).send(titlePosts)
}
catch(err)
{
    console.log(err)
    res.status(500).send('Could not get tags');
}
}

module.exports = {getTags,search};