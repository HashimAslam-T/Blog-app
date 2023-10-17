const{User} = require('../sequelizeModels/userModel')
const Sequelize = require('sequelize')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secret = '12345';

const signUp = async(req,res)=>
{
 try
 {
   const{username,password} = req.body;

   if(!username || !password)
   {
    return res.status(400).send('Username and password are required');
   }
   
   await User.create({username,password});
   res.status(200).send('user registered successfully');

 }
 catch(err)
 {
  console.error(err);
  if (err instanceof Sequelize.ValidationError) {
    res.status(400).json({ message: err.message });
  } else if (err instanceof Sequelize.UniqueConstraintError) {
    res.status(409).json({ message: 'Username already exists' });
  } else {
    res.status(500).json({ message: 'Something went wrong' });
  }
 }
}


const login = async (req,res)=>
{
 try
  {
   const{username,password} = req.body;

   if(!username || !password)
   {
    res.status(400).send('Username and password is needed');
   }
    
   const user = await User.findOne({where: {username}});
   if(!user)
   {
    return res.status(401).send('Invalid Credentials');
   } 
   
   const match = await bcrypt.compare(password, user.password);
   if(!match)
   {
    return res.status(401).send('Wrong Password');
   }

   const token = jwt.sign({id:user.id},secret);
   res.status(200).json({token})

  }

 catch(err)
  {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
}

module.exports = {signUp,login,secret}