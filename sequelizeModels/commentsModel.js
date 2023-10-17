const sequelize = require('../sequelize');
const {DataTypes} = require('sequelize');
const {User} = require('../sequelizeModels/userModel')
const {Post} = require('../sequelizeModels/blogPostModel')

const Comments = sequelize.define('Comments',{

    comment:{
        type: DataTypes.TEXT,
        allowNull: false,
        validate:{
            notEmpty:true
        }
    }
},{
    tableName: 'Comments',
    timestamps:false
});

Comments.belongsTo(User,{
     foreignKey: 'userId',
     targetKey: 'id'
});

Comments.belongsTo(Post,{
    foreignKey:'postId',
    targetKey:'id'
});

Comments.sync()
.then(() => console.log('comments table has been successfully created'))
.catch(error => console.log('This error occured',error));

module.exports = {Comments}