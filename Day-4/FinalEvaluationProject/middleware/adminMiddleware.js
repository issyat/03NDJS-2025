// Middleware function to check if the user is an admin
const isAdmin = (req, res, next) => {
    // Check if the user is not an admin
    if (!req.user.isAdmin) 
        return res.status(403).json({ message: 'You don\'t have the access 😊' });

    // If the user is an admin, pass control to the next middleware or route handler
    next();
};

export default isAdmin;