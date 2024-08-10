const http = require('http');
const { SERVER } = require('./api/config/environment');
const app = require('./index');
const mongoose = require('./utils/database');
const port = SERVER.PORT;
const server = http.createServer(app);
server.listen(port); 