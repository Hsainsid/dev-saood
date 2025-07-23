const dotenv = require("dotenv");
dotenv.config();
const config = {
    port: process.env.PORT,
    mongodb_uri: process.env.MONGODB_URI,
    db_name: process.env.DB_NAME,
    jwt_secret: process.env.JWT_SECRET,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
    access_token_expire: process.env.ACCESS_TOKEN_EXPIRE,
    refresh_token_expire: process.env.REFRESH_TOKEN_EXPIRE,
    node_env: process.env.NODE_ENV,
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
    cloud_name: process.env.CLOUD_NAME,
    cloud_api_key: process.env.CLOUD_API_KEY,
    cloud_api_secret: process.env.CLOUD_API_SECRET,
};

module.exports = config;