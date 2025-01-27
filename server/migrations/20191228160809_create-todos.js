exports.up = function (knex) {
  return knex.schema
    .createTable("organization", function (table) {
      table.increments("id");
      table.string("name").notNullable();
      table.boolean("is_deleted").defaultTo(false);
    })
    .createTable("user", function (table) {
      table.increments("id");
      table.string("name").notNullable();
      table.string("email").defaultTo(false);
      table.string("organization_id").notNullable();
      table.boolean("is_deleted").defaultTo(false);
    })
    .createTable("project", function (table) {
      table.increments("id");
      table.string("title").notNullable();
      table.string("organization_id").notNullable();
      table.boolean("is_deleted").defaultTo(false);
    })
    .createTable("todos", function (table) {
      table.increments("id");
      table.string("title");
      table.integer("order");
      table.string("project_id").notNullable();
      table.string("assignee_id");
      table.enu("status", ["todo", "in-progress", "done"]).defaultTo("todo");
    })
    .createTable("comment", function (table) {
      table.increments("id");
      table.string("message").notNullable();
      table.string("user_id").notNullable();
      table.string("todo_id").notNullable();
      table.boolean("is_deleted").defaultTo(false);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable("todos")
    .dropTable("organization")
    .dropTable("user")
    .dropTable("project")
    .dropTable("comment");
};
