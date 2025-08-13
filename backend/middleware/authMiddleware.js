const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  try {
    // Get token from Authorization header or cookies
    const authHeader = req.headers.authorization || req.cookies?.token;

    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization token missing' });
    }

    let token;
    if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else {
      token = authHeader; // raw token from cookies
    }

    if (!token) {
      return res.status(401).json({ error: 'Authorization token missing' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Support multiple key names (_id, userId, id)
    const id = decoded.id || decoded._id || decoded.userId;

    if (!id) {
      return res.status(401).json({ error: 'Token payload invalid - no user ID' });
    }

    req.user = decoded;   // Full payload
    req.userId = id;      // Always available

    next();
  } catch (err) {
    console.error('❌ Auth Middleware Error:', err.message);
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

module.exports = authenticate;
