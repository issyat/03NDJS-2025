import jwt from 'jsonwebtoken';

// Middleware function to authenticate requests
const auth = (req, res, next) => {
  // Extracting the Authorization header from the request
  const authHeader = req.headers.authorization;

  // Checking if the Authorization header exists and starts with 'Bearer '
  if (!authHeader?.startsWith('Bearer '))
    return res.status(401).json({ message: 'Unauthorized' });

  try {
    // Extracting the token from the Authorization header
    const token = authHeader.split(' ')[1];

    // Verifying the token using the secret key and decoding its payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attaching the decoded payload (user information) to the request object
    req.user = decoded;

    // Passing control to the next middleware or route handler
    next();
  } catch {
    // Responding with an error if the token is invalid or verification fails
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default auth;