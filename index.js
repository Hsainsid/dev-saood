const connectDB = require('./db/index.js');
const app = require('./app.js');
const config = require('./config/config.js');
const logger = require('./config/logger.js');

const port = config.port;

connectDB();


app.listen(port, () => {
    logger.info(`🚀 Server is running on: http://localhost:${port}`);
});