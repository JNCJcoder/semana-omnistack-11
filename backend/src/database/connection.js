const knex = require('knex');
const config = require('../../knexfile');

const env = process.env.NODE_ENV === 'test' ? config.test : config.development;

const connection = knex(env);

module.exports = connection;
