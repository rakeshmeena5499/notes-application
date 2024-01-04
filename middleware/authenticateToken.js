const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Get the JWT token from the request's headers
  const token = req.header('Authorization');
  if (!token) {
    console.log('Access denied. No token provided.'); 
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const tokenParts = token.split(' ');
  if (tokenParts.length !== 2) {
    console.log('Malformed token.'); 
    return res.status(401).json({ message: 'Malformed token.' });
  }
  const tokenValue = tokenParts[1];

  try {
    // Verify the token and extract the user information
    const decoded = jwt.verify(tokenValue, 'SecretKey');
    // Attach the user information to the request for later use in protected routes
    req.user = decoded;
    next();
  } catch (error) {
    console.log('Invalid token:', error); 
    res.status(401).json({ message: 'Invalid token.' });
  }
};
