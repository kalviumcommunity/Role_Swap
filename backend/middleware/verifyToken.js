const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.cookies?.token || req.header('Authorization')?.split(' ')[1];

    if(!token) {
        return res.status(401).json({ message: 'Acces denied: No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(400).json({ message: 'Invalid token.' });
    }
}