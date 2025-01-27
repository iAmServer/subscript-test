const _ = require("lodash");
const users = require("../database/user-queries.js");
const addErrorReporting = require("../utils");

function createUser(_, data) {
  return {
    name: data.name,
    email: data.email,
    organization_id: data.organization_id,
    is_deleted: data.is_deleted || false,
    id: data.id,
  };
}

async function getAllUsers(req, res) {
  const allEntries = await users.all(req.params.id);
  return res.send(allEntries.map(_.curry(createUser)(req)));
}

async function getUser(req, res) {
  const { id, organization_id } = req.params;
  const todo = await users.get(id, organization_id);
  return res.send(todo);
}

async function newUser(req, res) {
  const payload = {
    name: req.body.name,
    email: req.body.email,
    organization_id: req.params.id,
  };
  const created = await users.create(payload);

  return res.send(createUser(req, created));
}

async function updateUser(req, res) {
  const { id, organization_id } = req.params;
  const patched = await users.update(id, organization_id, req.body);

  return res.send(createUser(req, patched));
}

async function deleteUser(req, res) {
  const { id, organization_id } = req.params;
  const deleted = await users.delete(id, organization_id);
  return res.send(createUser(req, deleted));
}

const toExport = {
  getAllUsers: {
    method: getAllUsers,
    errorMessage: "Could not fetch all users",
  },
  getUser: {
    method: getUser,
    errorMessage: "Could not fetch user",
  },
  newUser: {
    method: newUser,
    errorMessage: "Could not create user",
  },
  updateUser: {
    method: updateUser,
    errorMessage: "Could not update user",
  },
  deleteUser: {
    method: deleteUser,
    errorMessage: "Could not delete user",
  },
};

for (let route in toExport) {
  toExport[route] = addErrorReporting(
    toExport[route].method,
    toExport[route].errorMessage
  );
}

module.exports = toExport;
