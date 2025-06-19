const jwt = require('jsonwebtoken');
const Owner = require('../models/Owner');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];

            if (!token || token === 'null' || token === 'undefined') {
                return res.status(401).json({
                    success: false,
                    message: 'Not authorized, no token provided'
                });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await Owner.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'Not authorized, user not found'
                });
            }

            next();
        } catch (error) {
            console.error('Error in owner authentication:', error);

            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ success: false, message: 'Invalid token' });
            } else if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ success: false, message: 'Token expired' });
            }

            res.status(401).json({ success: false, message: 'Not authorized' });
        }
    } else {
        res.status(401).json({ success: false, message: 'No token, authorization denied' });
    }
};

const adminProtect = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token || token === 'null' || token === 'undefined') {
        return res.status(401).json({
            success: false,
            message: 'Admin token not provided'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Access denied: Not an admin'
            });
        }

        req.admin = decoded;
        next();
    } catch (error) {
        console.error('Error in admin authentication:', error);

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Token expired' });
        }

        res.status(401).json({ success: false, message: 'Not authorized' });
    }
};

module.exports = { protect, adminProtect };
