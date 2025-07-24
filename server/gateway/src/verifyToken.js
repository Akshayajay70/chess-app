import jwt from 'jsonwebtoken';

export function verifyToken(requiredRole) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ error: `Access denied: ${requiredRole} only` });
      }
      req.headers['x-game-id'] = decoded.gameId;
      next();
    } catch (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
  };
}
