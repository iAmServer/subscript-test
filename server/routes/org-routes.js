const _ = require("lodash");
const orgs = require("../database/org-queries.js");
const addErrorReporting = require("../utils");

function createOrg(_, data) {
  return {
    name: data.name,
    is_deleted: data.is_deleted || false,
    id: data.id,
  };
}

async function getAllOrganizations(req, res) {
  const allEntries = await orgs.all();
  return res.send(allEntries.map(_.curry(createOrg)(req)));
}

async function getOrganization(req, res) {
  const todo = await orgs.get(req.params.id);
  return res.send(todo);
}

async function createOrganization(req, res) {
  const created = await orgs.create(req.body.name);
  return res.send(createOrg(req, created));
}

async function updateOrganization(req, res) {
  const patched = await orgs.update(req.params.id, req.body);
  return res.send(createOrg(req, patched));
}

async function deleteOrganization(req, res) {
  const deleted = await orgs.delete(req.params.id);
  return res.send(createOrg(req, deleted));
}

const toExport = {
  getAllOrganizations: {
    method: getAllOrganizations,
    errorMessage: "Could not fetch all organizations",
  },
  getOrganization: {
    method: getOrganization,
    errorMessage: "Could not fetch organization",
  },
  createOrganization: {
    method: createOrganization,
    errorMessage: "Could not create organization",
  },
  updateOrganization: {
    method: updateOrganization,
    errorMessage: "Could not update organization",
  },
  deleteOrganization: {
    method: deleteOrganization,
    errorMessage: "Could not delete organization",
  },
};

for (let route in toExport) {
  toExport[route] = addErrorReporting(
    toExport[route].method,
    toExport[route].errorMessage
  );
}

module.exports = toExport;
