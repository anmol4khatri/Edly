const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');

const configureSecurity = (app) => {
    // Set security HTTP headers
    app.use(helmet());

    // Data sanitization against NoSQL query injection
    app.use(mongoSanitize());

    // CORS configuration (already in server.js but good to centralize or keep there)
    // We will keep CORS in server.js or move here if needed. 
    // For now, these are the new additions.
};

module.exports = configureSecurity;
