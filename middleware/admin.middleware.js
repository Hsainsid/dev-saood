const jwt = require("jsonwebtoken");
const config = require("../config/config.js");
const Admin = require("../models/admin.model.js");
const logger = require("../config/logger.js");

const JWT_SECRET = config.jwt_secret;

const authAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            logger.warn(`Unauthorized access attempt: No token provided`);
            return res.status(401).json({
                success: false,
                message: "Authorization token missing or invalid"
            });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET);

        // Fetch admin details if needed
        const admin = await Admin.findById(decoded.id).select("-password");
        if (!admin) {
            logger.warn(`Unauthorized access attempt: Invalid admin ID in token`);
            return res.status(401).json({
                success: false,
                message: "Invalid token - admin not found"
            });
        }

        // Attach admin info to request
        req.admin = admin;
        logger.info(`Authorized admin: ${admin.email}`);
        next();

    } catch (err) {
        logger.error(`Auth middleware error: ${err.message}`, { stack: err.stack });
        return res.status(401).json({
            success: false,
            message: "Unauthorized: Invalid or expired token"
        });
    }
};

module.exports = authAdmin;
