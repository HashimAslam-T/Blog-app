const jwt = require('jsonwebtoken');
const {secret} = require('./controllers/authenticationController')

async function authenticateToken(req, res, next) {
  const token = req.headers['authorization']; 

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const user = await jwt.verify(token, secret);
    req.user = user; 
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Forbidden' });
  }
}

module.exports = {authenticateToken};
