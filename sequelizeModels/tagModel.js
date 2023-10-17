const sequelize = require('../sequelize');
const {DataTypes} = require('sequelize');

const Tag = sequelize.define('Tags',{
    tagName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true,
            len:[3,40]
        }
    }
},{
    tableName: 'Tags',
    timestamps: false
});

Tag.sync()
.then(() => console.log('Tag table has been successfully created'))
.catch(error => console.log('This error occured',error));


module.exports = {Tag}