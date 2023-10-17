const sequelize = require('../sequelize');
const {DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');

const User = sequelize.define('User',{
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            len:[3,20]
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [6,20]
        }
    }
},{
    tableName : 'users',
    timestamps: false,
    hooks: {
        beforeCreate: async(user) =>{
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
    }
});

User.sync()
.then(() => console.log('user table has been successfully created'))
.catch(error => console.log('This error occured',error));

module.exports = {User}