const sequelize = require('../sequelize');
const {DataTypes} = require('sequelize');
const {User} = require('../sequelizeModels/userModel')

const Post = sequelize.define('Post',{
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len:[3,40]
        }
    },
    body:{
        type: DataTypes.TEXT,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
},{
    tableName: 'Posts',
    timestamps: false
});

Post.belongsTo(User,{
    allowNull:false,
    foreignKey: 'userId',
    targetKey: 'id',
});

Post.sync()
.then(() => console.log('post table has been successfully created'))
.catch(error => console.log('This error occured',error));

module.exports = {Post}