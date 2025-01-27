const knex = require("./connection.js");

async function all() {
  return knex("organization").where({ is_deleted: false });
}

async function get(id) {
  const results = await knex("organization").where({ id, is_deleted: false });
  return results[0];
}

async function create(name) {
  const results = await knex("organization").insert({ name }).returning("*");
  return results[0];
}

async function update(id, properties) {
  const results = await knex("organization")
    .where({ id })
    .update({ ...properties })
    .returning("*");
  return results[0];
}

// delete is a reserved keyword
async function del(id) {
  const results = await knex("organization")
    .where({ id })
    .update({ is_deleted: true })
    .returning("*");
  return results[0];
}

async function clear() {
  return knex("organization").del().returning("*");
}

module.exports = {
  all,
  get,
  create,
  update,
  delete: del,
  clear,
};
