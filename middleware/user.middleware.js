const jwt = require("jsonwebtoken");
const config = require("../config/config.js");
const User = require("../models/user.model.js");

const JWT_SECRET = config.access_token_secret;

const authUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Please provide a valid token"
            });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token not found"
            });
        }

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Find user
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        req.user = user;
        next();

    } catch (error) {
        console.error('Auth Error:', error.message);
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: "Invalid token. Please log in again."
            });
        }
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: "Your session has expired. Please log in again."
            });
        }

        return res.status(401).json({
            success: false,
            message: "Not authorized to access this route"
        });
    }
};

module.exports = authUser;
