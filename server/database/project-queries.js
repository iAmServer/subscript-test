const knex = require("./connection.js");

async function all() {
  return knex("project").where({ is_deleted: false });
}

async function get(id) {
  const results = await knex("project").where({ id, is_deleted: false });
  return results[0];
}

async function getAllOrgProjects(organization_id) {
  return knex("project").where({ organization_id, is_deleted: false });
}

async function create(title, organization_id) {
  const results = await knex("project")
    .insert({ title, organization_id })
    .returning("*");
  return results[0];
}

async function update(id, properties) {
  const results = await knex("project")
    .where({ id })
    .update({ ...properties })
    .returning("*");
  return results[0];
}

// delete is a reserved keyword
async function del(id) {
  const results = await knex("project")
    .where({ id })
    .update({ is_deleted: true })
    .returning("*");
  return results[0];
}

async function clear() {
  return knex("project").del().returning("*");
}

module.exports = {
  all,
  get,
  create,
  update,
  delete: del,
  clear,
  organization: getAllOrgProjects,
};
