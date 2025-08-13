// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const protect = (req, res, next) => {
  const token = req.cookies.token; // Get the token from cookies
  console.log(token);

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    console.log(decoded);
    req.user = decoded; // Attach user information to the request

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

module.exports = { protect };
