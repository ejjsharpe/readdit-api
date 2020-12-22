const ENV = process.env.NODE_ENV || 'development';

const development = require('./development');
const test = require('./test');

const data = {
    production: development,
    development,
    test,
};

module.exports = data[ENV];