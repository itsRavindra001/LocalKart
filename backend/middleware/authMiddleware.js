const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authorization token missing or malformed' });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.status(401).json({ error: 'Token payload invalid' });
    }

    req.user = decoded;        // Contains full user payload
    req.userId = decoded.id;   // For convenience

    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

module.exports = authenticate;
