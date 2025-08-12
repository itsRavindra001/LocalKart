const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  try {
    // Get token from Authorization header or cookies
    const authHeader = req.headers.authorization || req.cookies?.token;

    if (!authHeader || (typeof authHeader === 'string' && !authHeader.startsWith('Bearer '))) {
      return res.status(401).json({ error: 'Authorization token missing or malformed' });
    }

    const token = typeof authHeader === 'string'
      ? authHeader.split(' ')[1]
      : authHeader; // If coming from cookies

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.status(401).json({ error: 'Token payload invalid' });
    }

    req.user = decoded;      // Contains full user payload (role, serviceType, etc.)
    req.userId = decoded.id; // For convenience

    next();
  } catch (err) {
    console.error('❌ Auth Middleware Error:', err.message);
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

module.exports = authenticate;
