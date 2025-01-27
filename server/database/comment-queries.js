const knex = require("./connection.js");

async function getAll(task_id) {
  return knex("comment").where({ todo_id: task_id, is_deleted: false });
}

async function create(message, user_id, todo_id) {
  const results = await knex("comment")
    .insert({ message, user_id, todo_id })
    .returning("*");
  return results[0];
}

// delete is a reserved keyword
async function del(id, user_id) {
  const results = await knex("comment")
    .where({ id, user_id })
    .update({ is_deleted: true })
    .returning("*");
  return results[0];
}

async function clear() {
  return knex("comment").del().returning("*");
}

module.exports = {
  all: getAll,
  create,
  delete: del,
  clear,
};
