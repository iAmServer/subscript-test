const knex = require("./connection.js");

async function get(id, organization_id) {
  const results = await knex("user").where({
    id,
    organization_id,
    is_deleted: false,
  });
  return results[0];
}

async function getAllOrgUsers(organization_id) {
  return knex("user").where({ organization_id, is_deleted: false });
}

async function create(payload) {
  const results = await knex("user")
    .insert({
      name: payload.name,
      email: payload.email,
      organization_id: payload.organization_id,
    })
    .returning("*");
  return results[0];
}

async function update(id, organization_id, properties) {
  const results = await knex("user")
    .where({ id, organization_id })
    .update({ ...properties })
    .returning("*");
  return results[0];
}

// delete is a reserved keyword
async function del(id, organization_id) {
  const results = await knex("user")
    .where({ id, organization_id })
    .update({ is_deleted: true })
    .returning("*");
  return results[0];
}

async function clear() {
  return knex("user").del().returning("*");
}

module.exports = {
  all: getAllOrgUsers,
  get,
  create,
  update,
  delete: del,
  clear,
};
