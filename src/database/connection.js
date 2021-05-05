const knex = require("knex");
const knex_file = require("../../knexfile");

const connection = knex(knex_file.development);
console.log("banco conectado");
console.log(knex_file.development);
module.exports = connection;
