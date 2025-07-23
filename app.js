const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routes/index.routes.js');
const logger = require('./config/logger.js');
const errorHandler = require('./middleware/errorsHandler.middleware.js');

const app = express();

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(
    morgan("combined", {
        stream: {
            write: (message) => logger.info(message.trim()),
        },
    })
);
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("Backend is working!");
});

app.use("/api/v1", router);

app.use(errorHandler);

module.exports = app;