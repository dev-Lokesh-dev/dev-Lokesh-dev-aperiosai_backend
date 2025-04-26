import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ error: 'Missing API Key' });
  }


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.apiClient = decoded.client;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired API Key' });
  }
};


