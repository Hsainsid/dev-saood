const { ApiError } = require("../utils/apiError.js");

const errorHandler = (err, req, res, next) => {
    console.error('Error Handler:', err); // Debug log
    
    // Handle API errors
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors || [],
        });
    }

    // Handle other types of errors
    return res.status(500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
    });
};

// Export as a named export
exports.errorHandler = errorHandler;
// Also export as default for backward compatibility
module.exports = errorHandler;
