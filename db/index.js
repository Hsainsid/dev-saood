const mongoose = require("mongoose");
const logger = require("../config/logger.js");
const config = require("../config/config.js");

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(config.mongodb_uri, {
            dbName: config.db_name,
        });

        logger.info(
            `✅ MongoDB connected — DB HOST: ${connectionInstance.connection.host}`
        );
    } catch (error) {
        logger.error("❌ MONGODB connection error:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
