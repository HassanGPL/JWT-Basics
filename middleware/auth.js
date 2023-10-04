const UnAuthenticatedError = require('../errors/unauthenticated');
const jwt = require('jsonwebtoken');

const authorizationMiddleware = (req, res, next) => {

    // Extract Authorization Header
    const authorizationHeader = req.headers.authorization;

    // Check Authorization Header
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer')) {
        throw new UnAuthenticatedError('No Token Provided');
    }

    // Extract Token from Authorization Header
    const token = authorizationHeader.split(' ')[1];

    try {

        // Decode Data from Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id, username } = decoded;

        // Store Data in req.user
        req.user = { id, username };

        next();

    } catch (error) {
        throw new UnAuthenticatedError('Not authorized to access this route');
    }
}

module.exports = authorizationMiddleware;