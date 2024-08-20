const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json("Access denied. No token provided.");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        req.user = decoded; // Attach the decoded token data to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        res.status(400).json("Invalid token.");
    }
};

module.exports = authMiddleware;
