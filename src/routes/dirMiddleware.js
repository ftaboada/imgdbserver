var fs = require("fs");
const middleware = {};
middleware.dir = __dirname.substring(0, __dirname.length - 10);
middleware.dir += "/public";

module.exports = middleware;
