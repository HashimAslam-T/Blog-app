const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const {Tag} = require('../sequelizeModels/tagModel');
const {Post} = require('../sequelizeModels/blogPostModel');

const BlogPostTag = sequelize.define('BlogPostTag', {
    BlogPostId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Posts', // Replace with your actual model name
        key: 'id',
      },
    },
    TagId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Tags', // Replace with your actual model name
        key: 'id',
      },
    },
  },{
    tableName: 'BlogPostTag',
    timestamps: false
});

Post.belongsToMany(sequelize.models.Tags, { through: 'BlogPostTag', foreignKey: 'BlogPostId' });

Tag.belongsToMany(sequelize.models.Post, { through: 'BlogPostTag', foreignKey: 'TagId' });

BlogPostTag.sync()
.then(() => console.log('Blog Post Tag table has been successfully created'))
.catch(error => console.log('This error occured',error));

module.exports = {BlogPostTag}